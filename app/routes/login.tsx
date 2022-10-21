import { LoaderFunction, redirect } from "@remix-run/node";
import { getUserInfo } from "~/server/session.server";
import { LOGIN_URL } from "~/utils/api.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserInfo(request);

  if (user) {
    throw redirect("/dashboard");
  } else {
    throw redirect(LOGIN_URL!);
  }
};
