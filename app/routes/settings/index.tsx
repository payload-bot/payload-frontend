import * as React from "react";
import { useUser } from "../settings";

export default function User() {
  const user = useUser();

  return (
    <div className="mt-8 max-w-5xl mx-auto">
      <h1 className="font-medium text-gray-800 text-2xl">Profile Settings</h1>
      <hr className="divide-x-2  my-4" />
      <h1 className="font-medium text-gray-800 text-2xl">General</h1>
      <input
        type="text"
        placeholder="Your SteamID"
        defaultValue={user.steamId ?? ""}
      />
      <input
        type="range"
        min="0"
        max="3"
      />
      
      <hr className="divide-x-2  my-4" />
      <h1 className="font-medium text-gray-800 text-2xl">Quick Actions</h1>
      <div className="flex flex-row flex-wrap gap-4">
        <form action="/logout" method="post">
          <button className="py-2 px-4 rounded-md  hover:bg-red-300 hover:text-red-700 bg-red-200 text-red-600 font-semibold transition duration-100">
            Logout
          </button>
        </form>

        <button className="py-2 px-4 rounded-md hover:bg-red-300 hover:text-red-700 bg-red-200 text-red-600 font-semibold transition duration-100">
          Delete User Data
        </button>
      </div>
    </div>
  );
}
