import { useEffect, useState } from "react";
import { ActionFunction, json, useFetcher, useLoaderData } from "remix";
import CommandToggle from "~/components/CommandToggle";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";
import { useGuild } from "../$id";

export const action: ActionFunction = async ({ request, params }) => {
  const guildId = params.id;
  const form = await request.formData();

  const commands = form.get("commands");

  try {
    await makeApiRequest(request, `/v1/guilds/${guildId}`, "patch", {
      commandRestrictions: JSON.parse(commands as any),
    });

    return json({ success: true });
  } catch (err) {
    return json({ success: false });
  }
};

export default function Commands() {
  const { server } = useGuild();
  const commands = useFetcher();

  const [commandsToRestrict, setCommandsToRestrict] = useState<string[]>([
    ...server.commands.restrictions,
  ]);

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

  useEffect(() => {
    if (commands.type === "done") {
      setSaving(false);
    }
  }, [commands]);

  function handleFormSubmission() {
    commands.submit(
      { commands: JSON.stringify(commandsToRestrict) },
      { replace: true, method: "post" }
    );
  }

  return (
    <section className="mx-auto my-4 w-1/2 p-2">
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-white">
        Commands
      </h2>
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

      <h2 className="my-4 text-2xl font-semibold text-gray-600 dark:text-white">
        Auto Responses
      </h2>
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

      {saving ? (
        <div className="sticky inset-x-0 bottom-4 flex items-center rounded-lg bg-black px-2 py-4">
          <p className="text-md flex-1 font-medium text-gray-700 dark:text-white">
            Please save your changes!
          </p>
          <commands.Form className="flex gap-4">
            <button
              className="text-md rounded-md bg-green-500 py-1 px-3 font-medium text-green-700 transition duration-150 hover:bg-green-600 disabled:bg-green-500/30 dark:text-green-900"
              disabled={commands.state === "submitting"}
              onClick={handleFormSubmission}
              type="submit"
            >
              Save
            </button>
          </commands.Form>
        </div>
      ) : null}
    </section>
  );
}
