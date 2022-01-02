import * as React from "react";
import { ActionFunction, json, useLoaderData } from "remix";
import { useUser } from "../settings";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  // do something with form, like validations!
};

export default function User() {
  const user = useUser();
  const { message } = useLoaderData<{ message: string }>();

  return (
    <div className="mt-8 max-w-5xl mx-auto">
      {message ? message : null}
      <h1 className="font-medium text-gray-800 text-2xl">Profile Settings</h1>
      <hr className="divide-x-2  my-4" />
      <h1 className="font-medium text-gray-800 text-2xl">General</h1>
      <form action="settings?index" method="post">
        <input
          type="text"
          placeholder="Your SteamID"
          defaultValue={user.steamId ?? ""}
        />
        <input type="range" min="0" max="3" />
        <button className="py-2 px-4 rounded-md bg-transparent hover:border-sky-600 hover:bg-sky-200 border-2 text-sm text-sky-600 border-sky-500 uppercase font-bold transition duration-150">
          Save
        </button>
      </form>

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
