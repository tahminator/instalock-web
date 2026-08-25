import { Utils } from "@tahminator/pipeline";
import { $ } from "bun";

export interface ServerState {
  port?: number;
}

export interface ServerInternalState extends ServerState {
  port: number;
  proc: ReturnType<typeof Bun.spawn>;
}

export class ServerClient {
  private constructor(private readonly iState: ServerInternalState) {}

  static async start(
    env: Record<string, string>,
    state: ServerState = {},
  ): Promise<ServerClient> {
    const port = state.port ?? 3050;

    await $`cd apps/server && pnpm run build`;

    const proc = Bun.spawn({
      cmd: ["node", "src/index.js"],
      cwd: "apps/server",
      env: {
        ...process.env,
        ...env,
        NODE_ENV: "production",
        NODE_OPTIONS: "--enable-source-maps",
      },
      stdout: "inherit",
      stderr: "inherit",
    });

    await this.waitUntilReady(port);

    return new this({ port, proc });
  }

  private static async waitUntilReady(port: number): Promise<void> {
    console.log("Waiting for server to become ready.");
    const attempts = 30;
    const ready = await Utils.waitUntil({
      attempts,
      intervalMs: 1000,
      predicate: async (attempt) => {
        const ok = await fetch(`http://localhost:${port}/livez`)
          .then((res) => res.ok)
          .catch(() => false);

        if (ok) {
          return true;
        }

        console.log(`Waiting for server... (${attempt}/${attempts})`);
        return false;
      },
    });

    if (!ready) {
      throw new Error("server failed to become ready");
    }

    console.log("server is ready");
  }

  get state(): ServerInternalState {
    return this.iState;
  }

  async [Symbol.asyncDispose](): Promise<void> {
    await this.stop();
  }

  async stop(): Promise<void> {
    this.iState.proc.kill();
    await this.iState.proc.exited;
  }
}
