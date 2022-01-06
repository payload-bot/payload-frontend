import { useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import GuildManageLayout from "~/components/GuildManageLayout";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";
import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";
import { badRequest } from "~/utils/httpHelpers";
import { validateSteamId } from "~/utils/steamid.server";

const LANGUAGES = {
  "en-US": "English",
  "pl-PL": "Polish",
  "fr-FR": "French",
  "es-ES": "Spanish",
  "de-DE": "German",
  "fi-FI": "Finnish",
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const guildId = params.id;

  try {
    const guild = await makeApiRequest<Server>(
      request,
      `/v1/guilds/${guildId}`,
      "get"
    );

    return guild;
  } catch (err) {
    throw redirect("/dashboard");
  }
};

type ActionData = { success: boolean };

export const action: ActionFunction = async ({ request, params }) => {
  const guildId = params.id;
  const form = await request.formData();

  const botName = form.get("botName");
  const prefix = form.get("prefix");
  const language = form.get("language");
  const snipePermissions = form.get("snipePermissions");

  await makeApiRequest(request, `/v1/guilds/${guildId}`, "patch", {
    botName,
    prefix,
    language,
    snipePermissions,
  });

  return json({ success: true });
};

export default function Index() {
  const server = useLoaderData<Server>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const [prefix, setPrefix] = useState(server.prefix);

  const submitting = transition.state === "submitting";

  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Avatar name={server.name} icon={server.icon} />
        <h1 className="text-2xl dark:text-white font-bold mt-4">
          {server.name}
        </h1>

        <div className="rounded-lg p-6 mt-10 bg-gray-600 dark:bg-slate-700">
          <h2 className="text-sm sm:text-lg uppercase my-4 text-gray-600 dark:text-white font-bold tracking-wide">
            Server Settings
          </h2>
          <Form method="post" className="p-5 grid gap-4 sm:grid-cols-3">
            <span className="col-span-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="botName"
                  className="text-gray-500 dark:text-white font-medium"
                >
                  Bot Name
                </label>
                <input
                  type="text"
                  id="botName"
                  name="botName"
                  placeholder="payload-neo"
                  maxLength={100}
                  minLength={1}
                  defaultValue={server.botName}
                />
              </div>
            </span>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="prefix"
                className="text-gray-500 dark:text-white font-medium"
              >
                Prefix
              </label>
              <input
                type="text"
                placeholder="pls"
                id="prefix"
                name="prefix"
                maxLength={20}
                minLength={1}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <p className="text-gray-400 dark:text-slate-400 overflow-ellipsis max-w-[20ch]">
                {prefix}commands
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="language"
                className="max-w-[20ch] text-gray-500 dark:text-white font-medium"
              >
                Language
              </label>
              <select
                id="language"
                name="language"
                defaultValue={server.language}
              >
                {Object.entries(LANGUAGES).map(([locale, humanized]) => (
                  <option key={locale} value={locale}>
                    {humanized}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="snipePermissions"
                className="text-gray-500 dark:text-white font-medium"
              >
                Snipe Permissions
              </label>
              <select
                id="snipePermissions"
                name="snipePermissions"
                defaultValue={server.enableSnipeForEveryone.toString()}
              >
                <option value="true">Everyone</option>
                <option value="false">Admins Only</option>
              </select>
            </div>

            <span className="col-span-3 mt-2 -mb-2">
              <button
                disabled={submitting}
                className="w-full mt-2 sm:mt-0 sm:w-max text-md sm:text-sm py-2 px-4 rounded-md disabled:bg-sky-600/50 bg-sky-600 hover:bg-sky-700 border text-white disabled:text-white/50 border-sky-700 uppercase font-bold transition duration-150 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </span>
          </Form>
        </div>
      </div>
    </>
  );
}

function Avatar({ icon, name }: { icon: string | null; name: string }) {
  return icon ? (
    <img
      className="rounded-full h-20 w-20 shadow-md shadow-gray-300 dark:shadow-slate-900 ring-inset object-cover"
      src={icon}
    />
  ) : (
    <div className="flex sm:flex-1">
      <div className="rounded-full text-white dark:bg-slate-800 bg-gray-500 h-20 w-20 shadow-md shadow-gray-300 dark:shadow-slate-900 ring-inset flex items-center justify-center">
        {getServerAvatarNoSrc(name)}
      </div>
    </div>
  );
}
