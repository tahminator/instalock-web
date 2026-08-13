import {
  Controller,
  GET,
  ResponseBody,
  ResponseEntity,
} from "@tahminator/sapling";

import {
  ApiResponseSchema,
  type ApiResponse,
} from "@/controller/api/index/schema";
import { VersionService } from "@/service/version";

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
  @ResponseBody(ApiResponseSchema)
  getApiIndex(): ResponseEntity<ApiResponse> {
    return ResponseEntity.ok().body(
      this.createBody(this.versionService.getVersion()),
    );
  }
}
