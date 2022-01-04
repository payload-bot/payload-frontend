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
    <div className="p-4 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2 w-3/5 sm:flex-1">
        <ServerAvatar icon={server.icon} name={server.name} />
        <p className="text-gray-600 dark:text-slate-200 font-medium truncate w-1/2 sm:w-full">
          {server.name}
        </p>
      </div>
      {server.isPayloadIn ? (
        <Link to={server.id}>
          <ChevronRightIcon
            height={40}
            width={40}
            className="text-gray-400 dark:text-slate-200 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-slate-500 cursor-pointer"
          />
        </Link>
      ) : (
        <button
          onClick={handleInvite}
          className="w-max sm:mt-0 sm:w-max text-md sm:text-sm py-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700 border text-white border-sky-700 uppercase font-bold transition duration-150"
        >
          Invite
        </button>
      )}
    </div>
  );
}
