import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = () => {
  return redirect("https://github.com/payload-bot", { status: 301 });
};
