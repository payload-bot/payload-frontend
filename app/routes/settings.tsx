import { LoaderFunction, Outlet, useLoaderData, useOutletContext } from "remix";
import Header from "~/components/Header";
import { requireUser } from "~/server/session.server";
import { makeApiRequestNullable } from "~/utils/api.server";
import { User, Webhook } from "~/utils/contracts";

type Context = { user: User; webhook: Webhook };

export const loader: LoaderFunction = async ({ request }) => {
  const [user, webhook] = await Promise.all([
    requireUser(request),
    makeApiRequestNullable<Webhook>(request, "/v1/webhooks/users", "get"),
  ]);

  return { user, webhook };
};

export default function Index() {
  const { user, webhook } = useLoaderData<Context>();

  return (
    <>
      <Header user={user} />
      <Outlet context={{ user, webhook }} />
    </>
  );
}

export function useUser() {
  return useOutletContext<Context>();
}
