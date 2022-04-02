import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
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

type CommandCheckMap = {
  name: string;
  checked: boolean;
};

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

  const commands = JSON.parse(
    form.get("commands") as string
  ) as unknown as CommandCheckMap[];

  const toRestrict = commands.filter((c) => c.checked).map((c) => c.name);

  try {
    await makeApiRequest(request, `/v1/guilds/${guildId}`, "patch", {
      commandRestrictions: toRestrict,
    });

    return json({ success: true });
  } catch (err) {
    return badRequest({ success: false });
  }
};

export default function Commands() {
  const transition = useTransition();

  const commands = useLoaderData<Server["commands"]>();

  const submitting = transition.state !== "idle";

  const mappedCmdToChecked = useMemo(() => mapCommandsToChecked(), [commands]);

  const [checkedList, setCheckedList] =
    useState<CommandCheckMap[]>(mappedCmdToChecked);

  const [saving, setSaving] = useState(false);

  function mapCommandsToChecked() {
    const regularCmds = commands.commands.map((c) => ({
      name: c,
      checked: commands.restrictions.includes(c),
    }));

    const autoCommands = commands.autoResponses.map((c) => ({
      name: c,
      checked: commands.restrictions.includes(c),
    }));

    return [...regularCmds, ...autoCommands];
  }

  function notifyFunction(cmdName: string, checked: boolean) {
    setSaving(true);

    setCheckedList((prev) =>
      prev.map((c) => {
        if (c.name === cmdName) {
          return { ...c, checked };
        }

        return c;
      })
    );
  }

  function handleReset() {
    setCheckedList(mappedCmdToChecked);

    setSaving(false);
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
            checked={checkedList.find((c) => c.name === cmd)!.checked}
            name={cmd}
            notifyFunction={notifyFunction}
          />
        ))}

      <h2 className="my-4 text-lg font-semibold text-gray-600 dark:text-white sm:text-2xl">
        Auto Responses
      </h2>

      {commands.autoResponses
        .filter((cmd) => !["restrict", "unrestrict"].includes(cmd))
        .sort()
        .map((cmd) => (
          <CommandToggle
            key={cmd}
            checked={checkedList.find((c) => c.name === cmd)!.checked}
            name={cmd}
            notifyFunction={notifyFunction}
          />
        ))}

      <Transition
        as={Fragment}
        show={saving}
        enter="transition ease-out duration-250"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-250"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-6"
      >
        <div className="fixed inset-x-0 bottom-4 mx-auto flex max-w-screen-md flex-col items-center gap-4 rounded-lg bg-black/90 px-2 py-4 sm:flex-row sm:gap-0">
          <p className="flex-1 text-lg font-medium text-gray-300 dark:text-white md:text-base">
            Please save your changes!
          </p>
          <span className="flex items-center justify-center">
            <button
              className="text-md mr-4 font-medium text-white"
              onClick={handleReset}
            >
              Reset
            </button>
            <Form replace method="post" className="flex gap-4">
              <input
                type="hidden"
                name="commands"
                value={JSON.stringify(checkedList)}
              />
              <button
                className="md:text-md min-w-[15ch] rounded-md bg-green-400 py-1 px-3 text-sm font-medium text-green-800 transition duration-150 hover:bg-green-500 disabled:bg-green-500/30 dark:bg-green-500 dark:text-green-900 dark:hover:bg-green-600"
                disabled={submitting}
                type="submit"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </Form>
          </span>
        </div>
      </Transition>
    </section>
  );
}
