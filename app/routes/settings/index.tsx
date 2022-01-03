import * as React from "react";
import { ActionFunction, json, useActionData } from "remix";
import Alert from "~/components/Alert";
import { makeApiRequest } from "~/utils/api.server";
import { badRequest } from "~/utils/httpHelpers";
import { validateSteamId } from "~/utils/steamid.server";
import { useUser } from "../settings";

type ActionErrors = {
  steamId: string;
};

type ActionData = { success: boolean; errors: ActionErrors };

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const errors = {} as ActionErrors;

  const steamId = form.get("steamId") as string | null;

  const validatedId = validateSteamId(steamId);

  if (!validatedId) {
    errors.steamId = "Please enter in a correct SteamID";
  }

  if (Object.values(errors).some(Boolean)) {
    return badRequest({ errors, success: false });
  }

  console.log(validatedId);

  const data = await makeApiRequest(request, "/v1/users", "patch", {
    steamId: validatedId,
  });

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

      <h1 className="font-bold text-gray-800 dark:text-white text-2xl">
        Profile Settings
      </h1>

      <hr className="divide-x-2 my-6 sm:my-4" />

      <div className="grid sm:grid-cols-2">
        <div className="space-y-4 sm:space-y-2 mb-4 sm:mb-0">
          <h1 className="font-semibold text-gray-800 text-2xl dark:text-slate-100">
            General
          </h1>
          <p className="text-md text-gray-500 font-medium w-full sm:w-3/4 dark:text-slate-300">
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
      <h1 className="font-medium text-gray-800 dark:text-slate-100 text-2xl mb-2">
        Quick Actions
      </h1>
      <div className="flex flex-row-reverse sm:flex-row flex-wrap gap-2 sm:gap-4 w-full">
        <button className="py-2 px-4 rounded-md w-full sm:w-max hover:bg-red-300 dark:hover:bg-red-500/25 bg-red-200 dark:bg-red-500/20 border border-red-600 text-red-600 dark:text-red-500 font-semibold transition duration-100">
          Delete User Data
        </button>
        <form action="/logout" method="post" className="w-full sm:w-max">
          <button className="py-2 px-4 rounded-md w-full sm:w-max hover:bg-red-100 dark:hover:bg-red-500/20 bg-transparent border border-red-600 text-red-600 dark:text-red-800 font-semibold transition duration-100">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
