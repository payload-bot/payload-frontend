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
import CommandToggle from "~/components/CommandToggle";
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

export default function Commands() {
  const server = useLoaderData<Server>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const [commandsToRestrict, setCommandsToRestrict] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function notifyFunction(cmdName: string, checked: boolean) {
    setSaving(true);
    if (checked) {
      setCommandsToRestrict([...commandsToRestrict, cmdName]);
    } else {
      const elementsChecked = commandsToRestrict.filter(
        (cmd) => cmd !== cmdName
      );
      setCommandsToRestrict(elementsChecked);
    }
  }

  return (
    <div>
      <h2>Commands</h2>
      {server.commands.commands
        .filter((cmd) => !["restrict", "unrestrict"].includes(cmd))
        .sort()
        .map((cmd) => (
          <CommandToggle
            key={cmd}
            checked={server.commands.restrictions.includes(cmd)}
            name={cmd}
            notifyFunction={notifyFunction}
          />
        ))}

      <h2>Auto Responses</h2>
      {server.commands.autoResponses
        .filter((cmd) => !["restrict", "unrestrict"].includes(cmd))
        .sort()
        .map((cmd) => (
          <CommandToggle
            key={cmd}
            checked={server.commands.restrictions.includes(cmd)}
            name={cmd}
            notifyFunction={notifyFunction}
          />
        ))}
    </div>
  );
}
