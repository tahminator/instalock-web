import {
  Controller,
  ControllerSchema,
  GET,
  HttpStatus,
  ResponseBody,
  ResponseEntity,
  RouteSchema,
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
@ControllerSchema({
  title: "Base",
  description: "Basic metadata about the running API instance.",
})
export default class ApiController {
  constructor(private readonly versionService: VersionService) {}

  private createBody(version: string): ApiResponse {
    return { author: "Tahmid Ahmed", version };
  }

  @GET()
  @ResponseBody(ApiResponseSchema)
  @RouteSchema({
    summary: "Get API index information",
    description: "Returns the API author and the currently deployed version.",
    responses: [
      {
        statusCode: HttpStatus.OK,
        description: "API metadata retrieved successfully",
        schema: ApiResponseSchema,
      },
    ],
  })
  getApiIndex(): ResponseEntity<ApiResponse> {
    return ResponseEntity.ok().body(
      this.createBody(this.versionService.getVersion()),
    );
  }
}
