import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

export function meta() {
  return [
    { title: "Payload" },
    {
      description:
        "TF2-oriented Discord bot that brings services like logs.tf or the fun pushcart leaderboard directly in your Discord server.",
    },
    { "theme-color": "#0074D9" },
  ];
}

export function links() {
  return [
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
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-800">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Payload | Oh no!</title>
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
