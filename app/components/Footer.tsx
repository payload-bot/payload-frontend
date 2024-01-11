import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="static bottom-0 left-0 flex w-full flex-col divide-y divide-gray-400 overflow-y-hidden bg-gray-300 p-4 dark:divide-slate-500 dark:bg-slate-700">
      {/* Top */}
      <div className="mb-4 grid grid-cols-2 gap-6 md:mx-auto md:w-3/4">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <img src="/logo.svg" alt="payload logo svg" className="h-12 w-12" />
            <a href="/">
              <p className="text-md font-medium text-gray-800 dark:text-slate-400 lg:text-xl">
                Payload
              </p>
            </a>
          </div>
          <div className="flex gap-2">
            <a href="https://github.com/payload-bot" rel="noreferrer">
              <img src="/thirdparty/github.svg" className="h-[32px] w-[32px]" />
            </a>

            <a href="https://discord.com/invite/gYnnMYz">
              <img
                src="/thirdparty/discord.svg"
                className="h-[32px] w-[32px]"
              />
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center gap-10">
          <div className="flex flex-col gap-4">
            <p className="font-bold uppercase tracking-wide text-gray-600 dark:text-slate-400">
              Legal
            </p>
            <Link
              to="/terms"
              className="font-medium text-gray-500 dark:text-slate-300"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="font-medium text-gray-500 dark:text-slate-300"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-bold uppercase tracking-wide text-gray-700 dark:text-slate-400">
              Payload
            </p>
            <a
              href="https://www.patreon.com/c43721"
              rel="noreferrer"
              className="font-medium text-gray-500 dark:text-slate-300"
            >
              Support
            </a>
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=644333502870978564&permissions=2214980672&scope=bot%20applications.commands"
              rel="noreferrer"
              className="font-medium text-gray-500 dark:text-slate-300"
            >
              Invite to Server
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center justify-center gap-2 pt-4 text-sm text-gray-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()}, Payload. All rights reserved.
      </div>
    </footer>
  );
}
