import React from "react";
import { ServerList } from "~/utils/contracts";
import ServerAvatar from "./ServerAvatar";

type SelectServerProps = {
  server: ServerList;
};

export default function SelectServer({ server }: SelectServerProps) {
  return (
    <div className="p-2 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center gap-2 ">
        <ServerAvatar icon={server.icon} name={server.name} />
        <p className="text-gray-600 font-medium truncate w-1/2 sm:w-full">{server.name}</p>
      </div>
    </div>
  );
}
