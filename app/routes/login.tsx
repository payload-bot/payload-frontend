import { LoaderFunction, redirect } from "remix";
import { getUserInfo } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserInfo(request);

  if (user) {
    throw redirect("/dashboard");
  } else {
    throw redirect(
      process.env.BASE_API_URL + "/api/auth" ?? "http://localhost:8080/api/auth"
    );
  }
};
