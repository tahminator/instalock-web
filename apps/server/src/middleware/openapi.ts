import { MiddlewareClass, Sapling } from "@tahminator/sapling";

import { VersionService } from "@/service/version";

@MiddlewareClass({
  deps: [VersionService],
})
export class OpenAPIVersionMiddleware {
  constructor(private readonly versionService: VersionService) {
    this.setOnce();
  }

  private setOnce() {
    Sapling.Extras.swaggerAndOpenApi.setMetadata({
      title: "Instalock API",
      version: this.versionService.getVersion(),
    });
  }
}
