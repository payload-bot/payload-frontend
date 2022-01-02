import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { ServerList } from "~/utils/contracts";
import ServerAvatar from "./ServerAvatar";

type SelectServerProps = {
  server: ServerList;
};

export default function SelectServer({ server }: SelectServerProps) {
  return (
    <div className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2 w-1/2 sm:flex-1">
        <ServerAvatar icon={server.icon} name={server.name} />
        <p className="text-gray-600 dark:text-slate-200 font-medium truncate w-1/2 sm:w-full">
          {server.name}
        </p>
      </div>
      <ChevronRightIcon
        height={40}
        width={40}
        className="text-gray-400 dark:text-slate-200 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-slate-500 cursor-pointer"
      />
    </div>
  );
}
