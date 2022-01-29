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
      <aside className="sticky top-0 h-screen w-[240px] bg-slate-700">
        <div className="flex flex-col gap-2 p-4">
          <Link to=".">
            <div className="rounded-lg p-2 font-medium text-gray-700 transition duration-150 hover:bg-gray-500 dark:text-white dark:hover:bg-gray-600">
              Basic
            </div>
          </Link>
          {SIDEBAR_LINKS.map((link) => (
            <Link key={link.toLowerCase()} to={link.toLowerCase()}>
              <div className="rounded-lg p-2 font-medium text-gray-700 transition duration-150 hover:bg-gray-500 dark:text-white dark:hover:bg-gray-600">
                {link}
              </div>
            </Link>
          ))}
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
