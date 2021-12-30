import { ApiErrorResponse } from "./api";

export class ApiError extends Error {
  public json: ApiErrorResponse;

  constructor(data: ApiErrorResponse) {
    super();
    this.name = "ApiError";
    this.message = data.message;
    this.json = data;
  }
}