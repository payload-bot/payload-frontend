import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { ServerList } from "~/utils/contracts";
import ServerAvatar from "./ServerAvatar";

type SelectServerProps = {
  server: ServerList;
};

export default function SelectServer({ server }: SelectServerProps) {
  return (
    <div className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2 w-1/2 sm:flex-1">
        <ServerAvatar icon={server.icon} name={server.name} />
        <p className="text-gray-600 font-medium truncate w-1/2 sm:w-full">
          {server.name}
        </p>
      </div>
      <ChevronRightIcon
        height={50}
        width={50}
        className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
      />
    </div>
  );
}
