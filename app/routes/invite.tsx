import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const inviteLink = process.env.INVITE_URL;

  if (!inviteLink) {
    throw new Response("", { status: 404 });
  }

  return redirect(inviteLink, { status: 301 });
};
