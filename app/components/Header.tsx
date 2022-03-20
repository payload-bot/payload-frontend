import { Popover } from "@headlessui/react";
import { Link, NavLink } from "remix";
import { User } from "~/utils/contracts";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <nav className="bg-sky-500 dark:bg-sky-700">
      <div className="mx-auto flex h-[60px] items-center justify-between py-1 px-2 md:px-8">
        <Link
          to="/"
          prefetch="intent"
          className="text-xl font-bold text-slate-800 dark:text-white"
        >
          Payload
        </Link>

        <Popover className="relative">
          <Popover.Button as="div">
            <img
              src={user.avatar}
              alt={`${user.username}'s discord avatar`}
              className="h-12 w-12 rounded-full ring-4 ring-inset ring-gray-500 cursor-pointer"
            />
          </Popover.Button>

          <Popover.Panel className="absolute left-3/4 z-10 mt-2 -translate-x-full transform bg-white sm:px-0 lg:max-w-3xl">
            <div className="flex flex-col gap-2 rounded-md p-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500" : "text-slate-500"
                  } transition duration-150 hover:text-blue-300`
                }
              >
                Settings
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500" : "text-slate-500"
                  } transition duration-150 hover:text-blue-300`
                }
              >
                Dashboard
              </NavLink>

              <div className="h-[1px] bg-slate-300" />

              <form
                action="logout"
                method="post"
                className="rounded-sm transition duration-75 hover:bg-red-200"
              >
                <button className="w-full font-semibold text-red-700">
                  Logout
                </button>
              </form>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </nav>
  );
}
