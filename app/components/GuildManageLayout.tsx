import React from "react";
import { Link } from "remix";

type GuildManageLayoutProps = {
  children?: React.ReactNode;
};

const SIDEBAR_LINKS = ["Commands", "Webhooks"];

export default function GuildManageLayout({
  children,
}: GuildManageLayoutProps) {
  return (
    <div className="flex">
      <aside className="min-h-[calc(100vh-60px)] w-[240px] bg-slate-700">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="sticky top-0">
            <Link to="." prefetch="intent">
              <div className="rounded-lg p-2 font-medium text-gray-700 transition duration-150 hover:bg-gray-500 dark:text-white dark:hover:bg-gray-600">
                Basic
              </div>
            </Link>
            {SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.toLowerCase()}
                to={link.toLowerCase()}
                prefetch="intent"
                className="flex flex-row items-center rounded-lg p-2  hover:bg-gray-500 dark:hover:bg-gray-600"
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
          <Link
            to=".."
            prefetch="intent"
            className="absolute bottom-4 flex-shrink"
          >
            <div className="rounded-lg p-2 font-medium text-gray-700 transition duration-150 hover:bg-gray-500 dark:text-white dark:hover:bg-gray-600">
              Back to Dashboard
            </div>
          </Link>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
