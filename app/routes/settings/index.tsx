import * as React from "react";
import { ActionFunction, json, useActionData, useLoaderData } from "remix";
import Alert from "~/components/Alert";
import { badRequest } from "~/utils/httpHelpers";
import { useUser } from "../settings";

type ActionErrors = {
  steamId: string;
};

type ActionData = { success: boolean; errors: ActionErrors };

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const errors = {} as ActionErrors;

  const steamId = form.get("steamId");

  if (typeof steamId !== "string") {
    errors.steamId = "Please enter in a correct SteamID";
  }

  if (Object.values(errors).some(Boolean)) {
    return badRequest({ success: false, errors });
  }

  return json({ errors, success: true });
};

export default function User() {
  const user = useUser();
  const actionData = useActionData<ActionData>();

  return (
    <div className="mt-8 max-w-5xl mx-auto px-8">
      <div className="my-4">
        {actionData?.success ? (
          <Alert type="success" message="Successfully saved user data" />
        ) : actionData?.success === false ? (
          <Alert type="failed" message="Failed to save user data" />
        ) : null}
      </div>

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
          <label htmlFor="steamId-input" className="text-gray-700 font-medium">
            SteamID
          </label>
          <input
            className="rounded-lg focus:border-sky-500"
            type="text"
            name="steamId"
            id="steamId-input"
            placeholder="Your SteamID"
            defaultValue={user.steamId ?? ""}
          />
          {actionData?.errors?.steamId ? (
            <p className="text-red-500 font-medium">
              {actionData.errors.steamId}
            </p>
          ) : null}
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
