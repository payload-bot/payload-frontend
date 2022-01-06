import React from "react";
import { Link } from "remix";

type GuildManageLayoutProps = {
  children?: React.ReactNode;
};

const SIDEBAR_LINKS = ["Basic", "Commands", "Webhooks"];

export default function GuildManageLayout({
  children,
}: GuildManageLayoutProps) {
  return (
    <div className="flex">
      <aside className="w-[240px] bg-slate-700 h-screen">
        <div className="p-4 flex flex-col gap-2">
          {SIDEBAR_LINKS.map((link) => (
            <Link key={link.toLowerCase()} to={link.toLowerCase()}>
              <div className="p-2 rounded-lg transition duration-150 hover:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-medium">
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
