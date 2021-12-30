import React from "react";
import { Link } from "remix";
import { User } from "~/utils/contracts";

type LandingHeaderProps = {
  user: User;
};

export default function LandingHeader({ user }: LandingHeaderProps) {
  return (
    <nav>
      <div className="max-w-6xl mx-auto flex justify-between items-center py-1 px-2 h-[60px]">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Payload
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-gray-500 hover:text-gray-800 transition duration-100 font-medium p-2 hidden md:block"
          >
            Discord
          </a>
          <a
            href="/"
            target="_blank"
            className="text-gray-500 hover:text-gray-800 transition duration-100 font-medium p-2 hidden md:block"
          >
            Github
          </a>
          {user ? (
            <Link
              to="/dashboard"
              className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition duration-75"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="py-2 px-4 bg-sky-600 text-white font-bold rounded-lg"
            >
              Login with Discord
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
