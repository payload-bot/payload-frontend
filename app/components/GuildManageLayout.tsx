import React from "react";
import { Link } from "@remix-run/react";
import Footer from "./Footer";

type GuildManageLayoutProps = {
  children?: React.ReactNode;
};

const SIDEBAR_LINKS = ["Commands", "Webhooks"];

export default function GuildManageLayout({
  children,
}: GuildManageLayoutProps) {
  return (
    <div className="flex">
      <aside className="hidden min-h-[calc(100vh-60px)] w-[240px] bg-gray-300 dark:bg-slate-700 lg:block">
        <div className="flex h-[calc(100vh-60px)] flex-col gap-2 p-4">
          <div className="sticky top-0 flex flex-col gap-2">
            <Link to="." prefetch="intent">
              <div className="rounded-lg p-2 font-medium text-gray-700 transition duration-150 hover:bg-gray-400 dark:text-white dark:hover:bg-gray-600">
                Basic
              </div>
            </Link>
            {SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.toLowerCase()}
                to={link.toLowerCase()}
                prefetch="intent"
                className="flex flex-row items-center rounded-lg p-2  hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                <div className="flex-1 font-medium text-gray-700 transition duration-150  dark:text-white ">
                  {link}
                </div>

                {link === "Webhooks" ? (
                  <div className="rounded-full bg-yellow-500 py-1 px-2 text-sm font-medium text-yellow-900">
                    New!
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
          {/* come back when it's like not so garbage */}
          {/* <Link
            to=".."
            prefetch="intent"
            className="absolute bottom-4 flex-shrink"
          >
            <div className="rounded-lg p-2 font-medium text-gray-700 transition duration-150 hover:bg-gray-500 dark:text-white dark:hover:bg-gray-600">
              Back to Dashboard
            </div>
          </Link> */}
        </div>
      </aside>
      <main className="flex-1">
        <section className="min-h-[calc(100vh-60px)]">{children}</section>
        <Footer />
      </main>
    </div>
  );
}
