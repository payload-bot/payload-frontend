import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { badRequest } from "remix-utils";
import CommandToggle from "~/components/CommandToggle";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { commands } = (await makeApiRequest<Server>(
    request,
    `/v1/guilds/${params.id}`,
    "get"
  )) as Server;

  return json(commands);
};

export const action: ActionFunction = async ({ request, params }) => {
  const guildId = params.id;
  const form = await request.formData();

  const commands = form.get("commands") as string;

  try {
    await makeApiRequest(request, `/v1/guilds/${guildId}`, "patch", {
      commandRestrictions: commands?.split(",") ?? [],
    });

    return json({ success: true });
  } catch (err) {
    return badRequest({ success: false });
  }
};

export default function Commands() {
  const commands = useLoaderData<Server["commands"]>();

  const transition = useTransition();

  const submitting = transition.state !== "idle";

  const [commandsToRestrict, setCommandsToRestrict] = useState<string[]>(
    commands.restrictions.filter(Boolean)
  );

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
    if (!submitting) {
      setSaving(false);
    }
  }, [transition, submitting]);

  return (
    <section className="relative mx-auto my-4 w-3/4 p-2 sm:w-1/2">
      <h2 className="text-lg font-semibold text-gray-600 dark:text-white sm:text-2xl">
        Commands
      </h2>
      {commands.commands
        .filter((cmd) => !["restrict", "unrestrict"].includes(cmd))
        .sort()
        .map((cmd) => (
          <CommandToggle
            key={cmd}
            checked={commands.restrictions.includes(cmd)}
            name={cmd}
            notifyFunction={notifyFunction}
          />
        ))}1

      <h2 className="my-4 text-lg font-semibold text-gray-600 dark:text-white sm:text-2xl">
        Auto Responses
      </h2>
      {commands.autoResponses
        .filter((cmd) => !["restrict", "unrestrict"].includes(cmd))
        .sort()
        .map((cmd) => (
          <CommandToggle
            key={cmd}
            checked={commands.restrictions.includes(cmd)}
            name={cmd}
            notifyFunction={notifyFunction}
          />
        ))}

      <Transition
        as={Fragment}
        show={saving}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-6"
      >
        {saving ? (
          <div className="fixed inset-x-0 bottom-4 mx-auto flex max-w-screen-md items-center rounded-lg bg-black/90 px-2 py-4">
            <p className="md:text-md flex-1 text-sm font-medium text-gray-300 dark:text-white">
              Please save your changes!
            </p>
            {/* I think I need to get a better version of this <button className="text-md mr-4 font-medium text-white">Reset</button> */}
            <Form replace method="post" className="flex gap-4">
              <input type="hidden" name="commands" value={commandsToRestrict} />
              <button
                className="md:text-md rounded-md bg-green-400 py-1 px-3 text-sm font-medium text-green-800 transition duration-150 hover:bg-green-500 disabled:bg-green-500/30 dark:bg-green-500 dark:text-green-900 dark:hover:bg-green-600"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Saving your changes..." : "Save Changes"}
              </button>
            </Form>
          </div>
        ) : (
          // HACK
          <></>
        )}
      </Transition>
    </section>
  );
}
