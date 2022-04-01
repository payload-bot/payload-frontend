import { json, LoaderFunction, Outlet, useCatch, useParams } from "remix";
import GuildManageLayout from "~/components/GuildManageLayout";
import { requireUser } from "~/server/session.server";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";
import { ApiError } from "~/utils/errors";

export const loader: LoaderFunction = async ({ params, request }) => {
  try {
    const match = params.id?.match(/^(?<id>\d{17,19})$/);

    if (match?.groups?.id == null) {
      throw new Response("Please enter a valid snowflake", { status: 404 });
    }

    const [user, server] = await Promise.all([
      requireUser(request),
      makeApiRequest<Server>(request, `/v1/guilds/${params.id}`, "get"),
    ]);

    const { channels, commands, webhook, ...rest } = server as Server;

    return json({ user, server: rest });
  } catch (err) {
    // Possible bug in Remix - this doesn't hit my catch boundary :thinking:
    if (err instanceof ApiError) {
      if (err.statusCode === 404) {
        throw new Response("", { status: 404 });
      } else if (err.statusCode === 403) {
        throw new Response("", { status: 403 });
      }
    } else {
      throw new Response("", { status: 404 });
    }
  }
};

export default function Index() {
  return (
    <GuildManageLayout>
      <Outlet />
    </GuildManageLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  let message = null;

  if (caught.status === 401) {
    message = "You do not have access to this guild!";
  } else if (caught.status === 404) {
    message = `Heyo! That guild, ${params.id}, doesn't exist!`;
  } else {
    throw new Error(`Unhandled error: ${caught.status}`);
  }

  return (
    <div className="mt-24 text-center text-lg text-gray-800 dark:text-white sm:text-xl md:text-3xl lg:text-5xl">
      {message}
      <br />
      <span className="text-md sm:text-md text-center text-gray-600 dark:text-slate-200 md:text-xl lg:text-2xl">
        You should double check your URL. Or perhaps you were revoked access 🤷
      </span>
    </div>
  );
}

export function ErrorBoundary(error: unknown) {
  console.error(error);

  return (
    <div className="mt-24 text-center text-lg text-gray-800 dark:text-white sm:text-xl md:text-5xl lg:text-7xl">
      🤯 Something went wrong 🤯
      <br />
      <span className="text-md text-center text-gray-600 dark:text-slate-200 sm:text-lg md:text-3xl lg:text-4xl">
        We're not sure what went wrong. Please try again later.
      </span>
    </div>
  );
}
