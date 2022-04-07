import { LoaderFunction, redirect } from "remix";
import { getUserInfo } from "~/server/session.server";
import { BASE_URL } from "~/utils/api.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserInfo(request);

  if (user) {
    throw redirect("/dashboard");
  } else {
    throw redirect(BASE_URL + "/auth");
  }
};
