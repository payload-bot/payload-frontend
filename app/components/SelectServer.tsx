import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { ServerList } from "~/utils/contracts";
import ServerAvatar from "./ServerAvatar";
import { Link } from "remix";

type SelectServerProps = {
  server: ServerList;
};

export default function SelectServer({ server }: SelectServerProps) {
  const handleInvite = () => {
    window.open("/invite", "_blank", "height=750,width=500");
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-slate-700 transition duration-150">
      <div className="flex w-3/5 items-center gap-2 sm:flex-1">
        <ServerAvatar icon={server.icon} name={server.name} />
        <p className="w-1/2 truncate font-medium text-gray-600 dark:text-slate-200 sm:w-full">
          {server.name}
        </p>
      </div>
      {server.isPayloadIn ? (
        <Link to={server.id} prefetch="intent">
          <ChevronRightIcon
            height={40}
            width={40}
            className="cursor-pointer rounded-full p-1 text-gray-400 hover:bg-gray-300 dark:text-slate-200 dark:hover:bg-slate-500 transition duration-75"
          />
        </Link>
      ) : (
        <button
          onClick={handleInvite}
          className="text-md w-max rounded-md border border-sky-700 bg-sky-600 py-2 px-4 font-bold uppercase text-white transition duration-150 hover:bg-sky-700 sm:mt-0 sm:w-max sm:text-sm"
        >
          Invite
        </button>
      )}
    </div>
  );
}
