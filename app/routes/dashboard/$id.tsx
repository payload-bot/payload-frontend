import { LoaderFunction, Outlet, useLoaderData, useOutletContext } from "remix";
import GuildManageLayout from "~/components/GuildManageLayout";
import { requireUser } from "~/server/session.server";
import { makeApiRequest } from "~/utils/api.server";
import { Server, User } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ params, request }) => {
  const [user, server] = await Promise.all([
    requireUser(request),
    makeApiRequest<Server>(request, `/v1/guilds/${params.id}`, "get"),
  ]);

  return { user, server };
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

export function useGuild() {
  return useOutletContext<GuildContext>();
}
