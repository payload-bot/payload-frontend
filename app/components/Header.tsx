import React from "react";
import { Link } from "remix";
import { User } from "~/utils/contracts";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <nav>
      <div className="max-w-6xl mx-auto flex justify-between items-center py-1 px-2 h-[60px]">
        <Link to="/" className="text-xl font-bold text-gray-800">Payload</Link>

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
            <img
              className="rounded-full h-[50px] w-[50px] border border-gray-400"
              src={user.avatar}
              alt={`${user.username}'s profile picture`}
            />
          ) : (
            <Link to="/login">Login with Discord</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
