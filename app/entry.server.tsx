import { renderToString } from "react-dom/server";
import { HandleDataRequestFunction, RemixServer } from "remix";
import type { EntryContext } from "remix";
import { isPrefetch } from "remix-utils";

export let handleDataRequest: HandleDataRequestFunction = async (
  response: Response,
  { request }
) => {
  let isGet = request.method.toLowerCase() === "get";

  if (isPrefetch(request) && isGet) {
    response.headers.set("Cache-Control", "private, max-age=10");
  }

  return response;
};

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
