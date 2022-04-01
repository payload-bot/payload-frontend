import { useEffect, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useActionData,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix";
import { forbidden } from "remix-utils";
import { BASE_URL, makeApiRequest } from "~/utils/api.server";
import { Server, Webhook } from "~/utils/contracts";
import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";

export const loader: LoaderFunction = async ({ params, request }) => {
  const guildId = params.id;

  const webhook = await makeApiRequest<Webhook>(
    request,
    `/v1/webhooks/guilds/${guildId}`,
    "get"
  ).catch(() => null);

  const { channels } = (await makeApiRequest<Server>(
    request,
    `/v1/guilds/${params.id}`,
    "get"
  )) as Server;

  return json({ webhook, channels });
};

export const action: ActionFunction = async ({ request, params }) => {
  const guildId = params.id;

  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case "create": {
      const response = await makeApiRequest<Webhook>(
        request,
        `/v1/webhooks/guilds/${guildId}`,
        "post",
        values
      ).catch(() => null);

      if (response === null) {
        return forbidden({
          success: false,
          errors: { channelId: "Failed to create webhook" },
        });
      }

      return response;
    }

    case "delete": {
      await makeApiRequest(request, `/v1/webhooks/guilds/${guildId}`, "delete");

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
  }
};

export default function Webhooks() {
  const { webhook, channels } = useLoaderData<{
    webhook: Webhook;
    channels: Server["channels"];
  }>();
  const data = useActionData();
  const fetcher = useFetcher();
  const transition = useTransition();

  const [copied, setCopied] = useState(false);

  const copyToken = async () => {
    await navigator.clipboard.writeText(webhook.value);
    setCopied(true);
  };

  useEffect(() => {
    const interval = setInterval(() => setCopied(false), 1500);

    return () => clearInterval(interval);
  }, [copied]);

  const submitting = transition.state === "submitting";

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="mt-10 w-1/2 rounded-lg bg-gray-300 p-6 dark:bg-slate-700">
        {webhook?.id ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-600 dark:text-white">
              Manage Webhook
            </h2>
            <div className="mt-4 flex justify-center gap-2">
              <div>
                <button
                  onClick={copyToken}
                  className="rounded-lg border border-slate-800 bg-slate-500 px-1 py-2 font-medium text-slate-900 transition  duration-200 hover:bg-slate-600"
                >
                  {copied ? "Copied!!" : "Copy Token"}
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
                No Webhooks :(
              </h2>
              <p className="text-md text-center font-bold text-gray-500 dark:text-slate-400">
                Let's create one!
              </p>
            </div>
            <Form replace method="post" className="flex flex-col gap-4">
              <select
                id="webhook-channel"
                name="channelId"
                className={
                  data?.errors?.channelId ? "border-2 border-red-700" : ""
                }
              >
                {channels.map((c) => (
                  <option value={c.id} label={c.name} key={c.id} />
                ))}
              </select>

              {data?.errors?.channelId ? (
                <p className="text-sm font-medium text-red-600 dark:text-red-600">
                  Heyo, I can't post to that channel!
                </p>
              ) : null}

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
    </div>
  );
}

function Avatar({ icon, name }: { icon: string | null; name: string }) {
  return icon ? (
    <img
      className="h-20 w-20 rounded-full object-cover shadow-md shadow-gray-300 ring-inset dark:shadow-slate-900"
      src={icon}
    />
  ) : (
    <div className="flex sm:flex-1">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-500 text-white shadow-md shadow-gray-300 ring-inset dark:bg-slate-800 dark:shadow-slate-900">
        {getServerAvatarNoSrc(name)}
      </div>
    </div>
  );
}
