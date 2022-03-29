import { ActionFunction, LoaderFunction, redirect } from "remix";
import {
  destroySession,
  getSession,
  getUserInfo,
} from "~/server/session.server";
import { makeApiRequest } from "~/utils/api.server";

export const loader: LoaderFunction = () => {
  throw redirect("/");
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserInfo(request);

  if (user) {
    await makeApiRequest(request, "/auth/logout", "get");

    const session = await getSession(request.headers.get("Cookie"));

    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  } else {
    throw redirect("/");
  }
};
