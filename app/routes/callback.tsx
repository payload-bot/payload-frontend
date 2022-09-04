import { LoaderFunction, redirect } from "@remix-run/node";
import { getUserInfo } from "~/server/session.server";
import { LOGIN_URL, makeApiRequest } from "~/utils/api.server";

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  if (searchParams.has("code")) {
    try {
      const data = await makeApiRequest(request, "/oauth/callback", "POST", {
        code: searchParams.get("code"),
      });
      console.log(data);
      throw redirect("/dashboard");
    } catch {
      // @TODO: login failure
      throw redirect("/");
    }
  }
};
