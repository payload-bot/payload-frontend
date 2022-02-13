import * as React from "react";
import {
  ActionFunction,
  Form,
  json,
  useActionData,
  useFetcher,
  useTransition,
} from "remix";
import Alert from "~/components/Alert";
import {
  BASE_URL,
  makeApiRequest,
  makeApiRequestNoContent,
} from "~/utils/api.server";
import { Webhook } from "~/utils/contracts";
import { badRequest } from "~/utils/httpHelpers";
import { validateSteamId } from "~/utils/steamid.server";
import { useUser } from "../settings";

type ActionErrors = {
  steamId: string;
};

type ActionData = { success: boolean; errors: ActionErrors };

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const { _action, ...values } = Object.fromEntries(form);

  switch (_action) {
    case "create": {
      return await makeApiRequest<Webhook>(
        request,
        `/v1/webhooks/users`,
        "post",
        values
      );
    }

    case "delete": {
      await makeApiRequestNoContent(request, `/v1/webhooks/users`, "delete");

      return null;
    }

    case "test": {
      const headers = new Headers();
      headers.append("Authorization", values.secret as string);

      await fetch(`${BASE_URL}/v1/webhooks/test`, {
        headers,
        method: "post",
        credentials: "omit",
      });

      return null;
    }

    default: {
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
    }
  }
};

export default function User() {
  const transition = useTransition();
  const fetcher = useFetcher();
  const actionData = useActionData<ActionData>();
  const { user, webhook } = useUser();

  const submitting = transition.state === "submitting";

  const copyToken = async () => {
    await navigator.clipboard.writeText(webhook.value);
  };

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

      <div className="grid sm:grid-cols-2">
        <div className="mb-4 space-y-4 sm:mb-0 sm:space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">
            User Webhook
          </h1>
          <p className="text-md w-full font-medium text-gray-500 dark:text-slate-300 sm:w-3/4">
            Webhook settings. This is used to send log previews using the{" "}
            <a
              href="https://github.com/payload-bot/payload-logs-plugin"
              rel="noreferrer"
              target="_blank"
              className="underline decoration-blue-500 decoration-2"
            >
              logs plugin
            </a>
          </p>
        </div>

        {webhook?.id ? (
          <>
            <div className="mt-4 flex justify-center gap-2">
              <div>
                <button
                  onClick={copyToken}
                  className="rounded-lg border border-slate-700 bg-slate-500 px-1 py-2 font-medium text-slate-900 transition  duration-200 hover:bg-slate-600"
                >
                  Copy Token
                </button>
              </div>

              <fetcher.Form replace method="post">
                <input type="hidden" name="secret" value={webhook.value} />
                <button
                  type="submit"
                  name="_action"
                  disabled={submitting}
                  value="test"
                  className="rounded-lg border border-green-700 bg-green-500 px-1 py-2 font-medium text-green-900 transition  duration-200 hover:bg-green-600"
                >
                  {fetcher.state === "submitting"
                    ? "Testing Webhook..."
                    : "Test Webhook"}
                </button>
              </fetcher.Form>

              <Form replace method="post">
                <button
                  type="submit"
                  name="_action"
                  disabled={submitting}
                  value="delete"
                  className="rounded-lg border border-red-700 px-1 py-2 font-medium text-red-700 transition duration-200 hover:bg-red-500/25"
                >
                  {submitting ? "Deleting Webhook" : "Delete Webhook"}
                </button>
              </Form>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-center text-2xl font-bold text-gray-600 dark:text-white">
                No Webhook!
              </h2>
              <p className="text-md text-center font-bold text-gray-500 dark:text-slate-400">
                Want to Create One?
              </p>
            </div>
            <Form replace method="post" className="flex flex-col gap-4">
              <button
                type="submit"
                name="_action"
                value="create"
                className="text-md justify-center rounded-md bg-green-500/90 px-2 py-3 font-medium text-green-900 transition duration-150 hover:bg-green-600"
              >
                {submitting ? "Creating your webhook..." : "Create new Webhook"}
              </button>
            </Form>
          </div>
        )}
      </div>

      <hr className="my-6 divide-x-2 sm:my-4" />
      <h1 className="mb-4 text-2xl font-medium text-gray-800 dark:text-slate-100">
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
