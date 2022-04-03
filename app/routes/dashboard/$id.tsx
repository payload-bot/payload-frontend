import {
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useCatch,
  useParams,
} from "remix";
import { forbidden, notFound } from "remix-utils";
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
        throw notFound({});
      } else if (err.statusCode === 403) {
        throw forbidden({});
      }
    } else {
      throw notFound({});
    }
  }
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${data.server.name} - payload.tf`,
  };
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

  if ([401, 403].includes(caught.status)) {
    message = "You do not have access to this guild!";
  } else if (caught.status === 404) {
    message = `Heyo! That guild, ${params.id}, doesn't exist!`;
  } else if (caught.status === 400) {
    message = `Woah there! You're sending invalid data 🤨.`;
  } else {
    throw new Error(`Unhandled error: ${caught.status}`);
  }

  return (
    <div className="mt-24 text-center text-lg text-gray-800 dark:text-white sm:text-xl md:text-3xl lg:text-5xl">
      {message}
      <br />
      {[401, 403, 404].includes(caught.status) ? (
        <span className="text-md sm:text-md text-center text-gray-600 dark:text-slate-200 md:text-xl lg:text-2xl">
          You should double check your URL. Or perhaps you were revoked access
          🤷
        </span>
      ) : (
        <span className="text-md sm:text-md text-center text-gray-600 dark:text-slate-200 md:text-xl lg:text-2xl">
          You'll want to report this in our{" "}
          <Link
            to="/discord"
            className="underline decoration-blue-600 decoration-2 hover:text-gray-500 dark:hover:text-slate-300"
          >
            Discord
          </Link>
          . You're not supposed to see this.
        </span>
      )}
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
