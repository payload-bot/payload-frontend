import { useState } from "react";
import { ActionFunction, Form, json, useParams, useTransition } from "remix";
import { badRequest, useRouteData } from "remix-utils";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";
import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";

const LANGUAGES = {
  "en-US": "English",
  "pl-PL": "Polish",
  "fr-FR": "French",
  "es-ES": "Spanish",
  "de-DE": "German",
  "fi-FI": "Finnish",
  "ru-RU": "Russian",
};

export const action: ActionFunction = async ({ request, params }) => {
  const guildId = params.id;
  const form = await request.formData();

  // FIXME: proper validation...
  const botName = form.get("botName") || "payload-neo";
  const prefix = form.get("prefix") || "pls ";

  const language = form.get("language");
  const snipePermissions = form.get("snipePermissions");

  try {
    await makeApiRequest(request, `/v1/guilds/${guildId}`, "patch", {
      botName,
      prefix,
      language,
      snipePermissions,
    });

    return json({ success: true });
  } catch (err) {
    throw badRequest({ success: false });
  }
};

export default function Index() {
  const params = useParams();
  const { server } = useRouteData<{ server: Server }>(
    `/dashboard/${params.id}`
  )!;

  const transition = useTransition();

  const [prefix, setPrefix] = useState(server.prefix);

  const submitting = transition.state === "submitting";

  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Avatar name={server.name} icon={server.icon} />
        <h1 className="mt-4 text-2xl font-bold dark:text-white">
          {server.name}
        </h1>
        <p className="text-sm font-light text-gray-600 dark:text-slate-500 md:text-lg">
          Pushed a total of {server.pushcartPoints} units!
        </p>

        <div className="mt-10 w-full rounded-lg bg-gray-500/20 p-6 dark:bg-slate-700 sm:w-3/4 lg:w-1/2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-white sm:text-lg">
            Server Settings
          </h2>
          <Form replace method="post" className="grid grid-cols-3 gap-4 p-5">
            <div className="col-span-3 flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="botName"
                className="font-medium text-gray-500 dark:text-white"
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

            <div className="col-span-3 flex flex-col gap-2 sm:col-span-1">
              <label
                htmlFor="prefix"
                className="font-medium text-gray-500 dark:text-white"
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
              <p className="max-w-[20ch] overflow-ellipsis text-gray-400 dark:text-slate-400">
                {prefix}commands
              </p>
            </div>

            <div className="col-span-3 flex flex-col gap-2 sm:col-span-1">
              <label
                htmlFor="language"
                className="max-w-[20ch] font-medium text-gray-500 dark:text-white"
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

            <div className="col-span-3 flex flex-col gap-2 sm:col-span-1">
              <label
                htmlFor="snipePermissions"
                className="font-medium text-gray-500 dark:text-white"
              >
                Snipe Permissions
              </label>
              <select
                id="snipePermissions"
                name="snipePermissions"
                defaultValue={server.enableSnipeForEveryone?.toString()}
              >
                <option value="true">Everyone</option>
                <option value="false">Admins Only</option>
              </select>
            </div>

            <span className="col-span-3 mt-2 -mb-2">
              <button
                disabled={submitting}
                className="text-md mt-2 w-full rounded-md border border-sky-700 bg-sky-600 py-2 px-4 font-bold uppercase text-white transition duration-150 hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-600/50 disabled:text-white/50 sm:mt-0 sm:w-max sm:text-sm"
              >
                {submitting ? "Saving..." : "Save"}
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
