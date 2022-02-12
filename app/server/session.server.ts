import { createCookieSessionStorage, redirect } from "remix";
import { makeApiRequest } from "~/utils/api.server";
import { User } from "~/utils/contracts";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export let { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export async function requireUser(request: Request) {
  const user = await getUserInfo(request);

  if (!user) {
    throw redirect("/");
  }

  return user;
}

export async function getUserInfo(request: Request) {
  try {
    const user = await makeApiRequest<User>(request, "/v1/users", "get");

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    return null;
  }
}
