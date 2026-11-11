type ApiErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export class ApiError extends Error {
  public statusCode: number;
  public error: string;

  constructor(data: ApiErrorResponse) {
    super();
    this.name = "ApiError";
    this.statusCode = data.statusCode;
    this.message = data.message;
    this.error = data.error ?? data.message;
  }
}
