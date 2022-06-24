import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("https://discord.com/invite/gYnnMYz", { status: 301 });
};
