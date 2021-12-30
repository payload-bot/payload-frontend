import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
  return {
    title: "Payload",
    description:
      "TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server.",
    "theme-color": "#0074D9",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: any) {
  console.error(error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 flex flex-col space-y-4 items-center justify-center h-screen">
        <p className="text-red-500 font-semibold text-2xl">
          Something went horribly wrong while serving your request.
        </p>
        <Link
          className="py-1 px-2 rounded-xl shadow-gray-500 shadow-md bg-gray-400 text-gray-600"
          to="/"
        >
          Go back to Safety
        </Link>
        <Scripts />
      </body>
    </html>
  );
}
