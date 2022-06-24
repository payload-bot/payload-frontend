import React from "react";
import { Link } from "@remix-run/react";
import { User } from "~/utils/contracts";

type LandingHeaderProps = {
  user: User;
};

export default function LandingHeader({ user }: LandingHeaderProps) {
  return (
    <nav>
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between py-1 px-2">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          Payload
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="/discord"
            target="_blank"
            className="hidden p-2 font-medium text-gray-500 transition duration-100 hover:text-gray-800 dark:text-slate-300 dark:hover:text-slate-100 md:block"
          >
            Discord
          </a>
          <a
            href="/github"
            target="_blank"
            className="hidden p-2 font-medium text-gray-500 transition duration-100 hover:text-gray-800 dark:text-slate-300 dark:hover:text-slate-100 md:block"
          >
            Github
          </a>
          {user ? (
            <Link
              to="/dashboard"
              prefetch="intent"
              className="rounded-lg bg-sky-600 py-2 px-4 font-bold text-white transition duration-75 hover:bg-sky-700"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-sky-600 py-2 px-4 font-bold text-white"
            >
              Login with Discord
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
