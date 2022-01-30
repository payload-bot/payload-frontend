import { useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";
import getServerAvatarNoSrc from "~/utils/getAvatarNoSource";

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

export const action: ActionFunction = async ({ request, params }) => {};

export default function Webhooks() {
  const server = useLoaderData<Server>();
  const transition = useTransition();

  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        <Avatar name={server.name} icon={server.icon} />
        <h1 className="mt-4 text-2xl font-bold dark:text-white">
          {server.name}
        </h1>

        <div className="mt-10 rounded-lg bg-gray-600 p-6 dark:bg-slate-700">
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-white sm:text-lg">
            Webhook Settings
          </h2>
          {server.webhook ? <p>{server.webhook.id}</p> : "No webhook set."}
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
