import {
  ActionFunction,
  Form,
  LoaderFunction,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix";
import {
  BASE_URL,
  makeApiRequest,
  makeApiRequestNoContent,
} from "~/utils/api.server";
import { Webhook } from "~/utils/contracts";
import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";
import { useGuild } from "../$id";

export const loader: LoaderFunction = async ({ params, request }) => {
  const guildId = params.id;

  try {
    const guild = await makeApiRequest<Webhook>(
      request,
      `/v1/webhooks/guilds/${guildId}`,
      "get"
    );

    return guild;
  } catch (err) {
    return null;
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  const guildId = params.id;

  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case "create": {
      return await makeApiRequest<Webhook>(
        request,
        `/v1/webhooks/guilds/${guildId}`,
        "post",
        values
      );
    }

    case "delete": {
      await makeApiRequestNoContent(
        request,
        `/v1/webhooks/guilds/${guildId}`,
        "delete"
      );

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
  const webhook = useLoaderData<Webhook>();
  const fetcher = useFetcher();
  const transition = useTransition();
  const { server } = useGuild();

  const copyToken = async () => {
    await navigator.clipboard.writeText(webhook.value);
  };

  const submitting = transition.state === "submitting";

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <Avatar name={server.name} icon={server.icon} />
      <h1 className="mt-4 text-2xl font-bold dark:text-white">{server.name}</h1>

      <div className="mt-10 w-1/2 rounded-lg bg-gray-600 p-6 dark:bg-slate-700">
        {webhook?.id ? (
          <>
            <h2 className="text-center text-2xl font-bold text-gray-600 dark:text-white">
              Manage Webhook
            </h2>
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
                No Webhooks :(
              </h2>
              <p className="text-md text-center font-bold text-gray-500 dark:text-slate-400">
                Let's create one!
              </p>
            </div>
            <Form replace method="post" className="flex flex-col gap-4">
              <select id="webhook-channel" name="channelId">
                {server.channels.map((c) => (
                  <option value={c.id} label={c.name} key={c.id} />
                ))}
              </select>

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
