import { ApiError } from "./errors";

export async function makeApiRequest<T>(
  request: Request,
  endpoint: string,
  method: Request["method"],
  body?: any
) {
  const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:8080/api";

  const response = await fetch(BASE_URL + endpoint, {
    method,
    headers: {
      Cookie: request.headers.get("cookie") ?? "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(await response.json());
  }

  return (await response.json()) as T;
}

export async function makeApiRequestNoContent(
  request: Request,
  endpoint: string,
  method: Request["method"],
  body?: any
): Promise<undefined> {
  const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:8080/api";

  const response = await fetch(BASE_URL + endpoint, {
    method,
    headers: {
      Cookie: request.headers.get("cookie") ?? "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(await response.json());
  }

  return;
}

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};
