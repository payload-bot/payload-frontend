import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("https://discord.com/api/oauth2/authorize?client_id=644333502870978564&permissions=2214980672&scope=bot%20applications.commands", { status: 301 });
};
