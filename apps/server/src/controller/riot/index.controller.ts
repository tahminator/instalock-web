import { Controller, GET, ResponseEntity } from "@tahminator/sapling";

import { VersionService } from "@/service/version";

type ApiResponse = {
  author: string;
  version: string;
};

@Controller({
  prefix: "/api",
  deps: [VersionService],
})
export default class ApiController {
  constructor(private readonly versionService: VersionService) {}

  private createBody(version: string): ApiResponse {
    return { author: "Tahmid Ahmed", version };
  }

  @GET()
  getApiIndex(): ResponseEntity<ApiResponse> {
    return ResponseEntity.ok().body(
      this.createBody(this.versionService.getVersion()),
    );
  }
}
