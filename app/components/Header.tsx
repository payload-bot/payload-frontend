import { Link } from "remix";
import { User } from "~/utils/contracts";

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <nav className="bg-sky-500 dark:bg-sky-700">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between py-1 px-2">
        <Link
          to="/"
          prefetch="intent"
          className="text-xl font-bold text-slate-800 dark:text-white"
        >
          Payload
        </Link>

        <div className="flex flex-row items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden p-2 font-medium text-slate-500 transition duration-100 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 md:block"
          >
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="hidden p-2 font-medium text-slate-500 transition duration-100 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 md:block"
          >
            Settings
          </Link>

          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={`${user.username}'s discord avatar`}
              className="h-12 w-12 rounded-full ring-4 ring-inset ring-gray-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
