import { ApiError } from "./errors";

export const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:8080/api";

export async function makeApiRequest<TData = any>(
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

  // No content response - no JSON!
  if (response.status === 204) {
    return;
  }

  const json = (await response.json()) as TData;

  if (!json) {
    return null;
  } else {
    return json;
  }
}
