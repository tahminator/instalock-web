import { Injectable } from "@tahminator/sapling";

@Injectable()
export class VersionService {
  private readonly version: string;

  constructor() {
    this.version = process.env.VERSION ?? "N/A";
  }

  getVersion(): string {
    return this.version;
  }
}
