import { LoaderFunction, redirect } from "@remix-run/node";
import { makeApiRequestWithHeaders } from "~/utils/api.server";

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  if (searchParams.has("code")) {
    try {
      const { headers } = await makeApiRequestWithHeaders(
        request,
        "/oauth/callback",
        "POST",
        {
          code: searchParams.get("code"),
        }
      );

      const cookie = headers.get("set-cookie");

      throw redirect("/dashboard", {
        headers: { "Set-Cookie": cookie! },
      });
    } catch {
      // @TODO: login failure
      throw redirect("/");
    }
  }
};
