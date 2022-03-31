import {
  LoaderFunction,
  Outlet,
  useCatch,
  useLoaderData,
  useOutletContext,
  useParams,
} from "remix";
import GuildManageLayout from "~/components/GuildManageLayout";
import { requireUser } from "~/server/session.server";
import { makeApiRequest } from "~/utils/api.server";
import { Server, User } from "~/utils/contracts";
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

    return { user, server };
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

type GuildContext = { user: User; server: Server };

export default function Index() {
  const data = useLoaderData<User>();

  return (
    <GuildManageLayout>
      <Outlet context={data} />
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

export function ErrorBoundary() {
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

export function useGuild() {
  return useOutletContext<GuildContext>();
}
