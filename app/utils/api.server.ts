import { ApiError } from "./errors";

export const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:8080/api";

export async function makeApiRequest<T>(
  request: Request,
  endpoint: string,
  method: Request["method"],
  body: any = null
) {
  body &&= JSON.stringify(body);

  const response = await fetch(BASE_URL + endpoint, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!response.ok) {
    throw new ApiError(await response.json());
  }

  return (await response.json()) as T;
}

export async function makeApiRequestNullable<T>(
  request: Request,
  endpoint: string,
  method: Request["method"],
  body: any = null
): Promise<T | null> {
  try {
    return await makeApiRequest(request, endpoint, method, body);
  } catch (err) {
    return null;
  }
}

export async function makeApiRequestNoContent(
  request: Request,
  endpoint: string,
  method: Request["method"],
  body: any = null
): Promise<undefined> {
  body &&= JSON.stringify(body);

  const response = await fetch(BASE_URL + endpoint, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("cookie") ?? "",
    },
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
