import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("https://github.com/payload-bot", { status: 301 });
};
