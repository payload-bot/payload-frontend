import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link, NavLink } from "@remix-run/react";
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
              className="h-12 w-12 cursor-pointer rounded-full ring-4 ring-inset ring-gray-500"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-3/4 z-10 mt-2 w-32 -translate-x-full transform rounded-sm bg-white sm:px-0">
              <div className="flex flex-col gap-2 rounded-md p-2">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-sky-500" : "text-slate-600"
                    } transition duration-150 hover:text-sky-300`
                  }
                >
                  Settings
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-sky-500" : "text-slate-600"
                    } transition duration-150 hover:text-sky-300`
                  }
                >
                  Dashboard
                </NavLink>

                <div className="h-[1px] bg-slate-300" />

                <form
                  action="/logout"
                  method="post"
                  className="rounded-sm transition duration-150 hover:bg-red-200"
                >
                  <button className="w-full font-semibold text-red-700">
                    Logout
                  </button>
                </form>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </nav>
  );
}
