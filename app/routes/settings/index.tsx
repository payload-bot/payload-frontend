import * as React from "react";
import {
  ActionFunction,
  Form,
  json,
  useActionData,
  useTransition,
} from "remix";
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

  await makeApiRequest(request, "/v1/users", "patch", {
    steamId: validatedId,
  });

  return json({ errors, success: true });
};

export default function User() {
  const transition = useTransition();
  const actionData = useActionData<ActionData>();
  const user = useUser();

  const submitting = transition.state === "submitting";

  return (
    <div className="mx-auto mt-8 max-w-5xl px-8">
      <div className="my-4">
        {actionData?.success ? (
          <Alert type="success" message="Successfully saved user data" />
        ) : actionData?.success === false ? (
          <Alert type="failed" message="Failed to save user data" />
        ) : null}
      </div>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Profile Settings
      </h1>

      <hr className="my-6 divide-x-2 sm:my-4" />

      <div className="grid sm:grid-cols-2">
        <div className="mb-4 space-y-4 sm:mb-0 sm:space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">
            General
          </h1>
          <p className="text-md w-full font-medium text-gray-500 dark:text-slate-300 sm:w-3/4">
            General account settings. Please note this information is public!
          </p>
        </div>
        <Form method="post" className="flex flex-col gap-2">
          <label
            htmlFor="steamId-input"
            className="font-medium text-gray-700 dark:text-slate-300"
          >
            SteamID
          </label>

          <input
            className="rounded-lg focus:border-sky-500"
            type="text"
            name="steamId"
            id="steamId-input"
            placeholder="Your SteamID"
            defaultValue={actionData?.errors?.steamId ? "" : user.steamId ?? ""}
          />
          {actionData?.errors?.steamId ? (
            <p className="font-medium text-red-500">
              {actionData.errors.steamId}
            </p>
          ) : null}

          <button
            disabled={submitting}
            className="text-md mt-2 w-full rounded-md border border-sky-700 bg-sky-600 py-2 px-4 font-bold uppercase text-white transition duration-150 hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-600/50 disabled:text-white/50 sm:mt-0 sm:w-max sm:text-sm"
          >
            Save
          </button>
        </Form>
      </div>

      <hr className="my-6 divide-x-2 sm:my-4" />
      <h1 className="mb-2 text-2xl font-medium text-gray-800 dark:text-slate-100">
        Quick Actions
      </h1>
      <div className="flex w-full flex-row-reverse flex-wrap gap-2 sm:flex-row sm:gap-4">
        <button className="w-full rounded-md border border-red-600 bg-red-200 py-2 px-4 font-semibold text-red-600 transition duration-100 hover:bg-red-300 dark:bg-red-500/20 dark:text-red-500 dark:hover:bg-red-500/25 sm:w-max">
          Delete User Data
        </button>
        <form action="/logout" method="post" className="w-full sm:w-max">
          <button className="w-full rounded-md border border-red-600 bg-transparent py-2 px-4 font-semibold text-red-600 transition duration-100 hover:bg-red-100 dark:text-red-800 dark:hover:bg-red-500/20 sm:w-max">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
