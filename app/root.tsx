import {
  Link,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
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
  return [
    { rel: "stylesheet", href: styles },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png",
    },
  ];
};

export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 dark:bg-gray-800">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-red-100 flex flex-col gap-2 items-center justify-center h-screen">
        <p className="text-red-500 font-semibold text-4xl">Yikes...</p>
        <p className="text-red-500 font-normal text-xl">
          Something went horribly wrong while serving your request. Please
          refresh the page.
        </p>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html>
      <head>
        <title>
          {caught.status} | {caught.statusText}
        </title>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 flex flex-col gap-4 items-center justify-center h-screen">
        <p className="text-gray-700 font-semibold text-4xl">
          {caught.status} <span className="divide-x divide-gray-500"></span>{" "}
          {caught.statusText}
        </p>
        <p className="text-gray-500 font-normal text-xl">
          Something's off.{" "}
          <Link
            to="/"
            prefetch="intent"
            className="underline decoration-2 decoration-gray-500 hover:text-gray-600"
          >
            Bring me back to safety
          </Link>
        </p>
        <Scripts />
      </body>
    </html>
  );
}
