const BASE_URL = process.env.BASE_API_URL ?? "http://localhost:8080/api";

export async function makeApiRequest<T>(
  request: Request,
  endpoint: string,
  method: Request["method"],
  body?: any
) {
  const response = await fetch(BASE_URL + endpoint, {
    method,
    headers: {
      Cookie: request.headers.get("cookie") ?? "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return (await response.json()) as T;
}
