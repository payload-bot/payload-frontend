import { LoaderFunction, redirect } from "@remix-run/node";
import { makeApiRequest } from "~/utils/api.server";

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  if (searchParams.has("code")) {
    try {
      await makeApiRequest(request, "/oauth/callback", "POST", {
        code: searchParams.get("code"),
      });

      throw redirect("/dashboard");
    } catch {
      // @TODO: login failure
      throw redirect("/");
    }
  }
};
