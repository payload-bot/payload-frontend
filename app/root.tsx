import type { MetaFunction } from "@remix-run/node";
import { LinksFunction } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

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
      <body className="dark:bg-gray-800">
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
      <body className="flex h-screen flex-col items-center justify-center gap-2 bg-red-100">
        <p className="text-4xl font-semibold text-red-500">Yikes...</p>
        <p className="text-xl font-normal text-red-500">
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
      <body className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-4xl font-semibold text-gray-700">
          {caught.status} <span className="divide-x divide-gray-500"></span>{" "}
          {caught.statusText}
        </p>
        <p className="text-xl font-normal text-gray-500">
          Something's off.{" "}
          <Link
            to="/"
            prefetch="intent"
            className="underline decoration-gray-500 decoration-2 hover:text-gray-600"
          >
            Bring me back to safety
          </Link>
        </p>
        <Scripts />
      </body>
    </html>
  );
}
