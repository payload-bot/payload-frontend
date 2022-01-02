import { Link } from "remix";
import { User } from "~/utils/contracts";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <nav className="bg-sky-500 dark:bg-sky-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-1 px-2 h-[60px]">
        <Link
          to="/"
          prefetch="intent"
          className="text-xl font-bold text-slate-800 dark:text-white"
        >
          Payload
        </Link>

        <div className="flex flex-row gap-2 items-center">
          <Link
            to="/dashboard"
            className="text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition duration-100 font-medium p-2 hidden md:block"
          >
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition duration-100 font-medium p-2 hidden md:block"
          >
            Settings
          </Link>

          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={`${user.username}'s discord avatar`}
              className="rounded-full ring-4 ring-gray-500 ring-inset w-12 h-12"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
