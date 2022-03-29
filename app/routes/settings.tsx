import { LoaderFunction, Outlet, useLoaderData, useOutletContext } from "remix";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { requireUser } from "~/server/session.server";
import { makeApiRequest } from "~/utils/api.server";
import { User, Webhook } from "~/utils/contracts";

type Context = { user: User; webhook: Webhook };

export const loader: LoaderFunction = async ({ request }) => {
  const [user, webhook] = await Promise.all([
    requireUser(request),
    makeApiRequest<Webhook>(request, "/v1/webhooks/users", "get").catch(
      () => null
    ),
  ]);

  return { user, webhook };
};

export default function Index() {
  const { user, webhook } = useLoaderData<Context>();

  return (
    <>
      <Header user={user} />
      <Outlet context={{ user, webhook }} />
      <Footer />
    </>
  );
}

export function useUser() {
  return useOutletContext<Context>();
}
