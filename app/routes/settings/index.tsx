import * as React from "react";
import { ActionFunction, json, useLoaderData } from "remix";
import { useUser } from "../settings";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const steamId = form.get("steamId");

  return { success: true, errors: {} };
};

export default function User() {
  const user = useUser();

  return (
    <div className="mt-8 max-w-5xl mx-auto px-8">
      <h1 className="font-bold text-gray-800 text-2xl">Profile Settings</h1>

      <hr className="divide-x-2 my-6 sm:my-4" />

      <div className="grid sm:grid-cols-2">
        <div className="space-y-4 sm:space-y-2 mb-4 sm:mb-0">
          <h1 className="font-semibold text-gray-800 text-2xl">General</h1>
          <p className="text-md text-gray-500 font-medium w-full sm:w-3/4">
            General account settings. Please note this information is public!
          </p>
        </div>
        <form
          action="settings?index"
          method="post"
          className="flex flex-col gap-2"
        >
          <label htmlFor="steamId" className="text-gray-700 font-medium">
            SteamID
          </label>
          <input
            className="rounded-lg focus:border-sky-500"
            type="text"
            id="steamId"
            placeholder="Your SteamID"
            defaultValue={user.steamId ?? ""}
          />
          <button className="w-full mt-2 sm:mt-0 sm:w-max text-md sm:text-sm  py-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700 border text-white border-sky-700 uppercase font-bold transition duration-150">
            Save
          </button>
        </form>
      </div>

      <hr className="divide-x-2 my-6 sm:my-4" />
      <h1 className="font-medium text-gray-800 text-2xl mb-2">Quick Actions</h1>
      <div className="flex flex-row-reverse sm:flex-row flex-wrap gap-2 sm:gap-4 w-full">
        <button className="py-2 px-4 rounded-md w-full sm:w-max hover:bg-red-300 bg-red-200 border border-red-600 text-red-600 font-semibold transition duration-100">
          Delete User Data
        </button>
        <form action="/logout" method="post" className="w-full sm:w-max">
          <button className="py-2 px-4 rounded-md w-full sm:w-max hover:bg-red-100 bg-transparent border border-red-600 text-red-600 font-semibold transition duration-100">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
