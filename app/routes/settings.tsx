import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { requireUser } from "~/server/session.server";
import { makeApiRequest } from "~/utils/api.server";
import { User, Webhook } from "~/utils/contracts";

type LoaderData = { user: User; webhook: Webhook };

export const loader: LoaderFunction = async ({ request }) => {
  const [user, webhook] = await Promise.all([
    requireUser(request),
    makeApiRequest<Webhook>(request, "/v1/webhooks/users", "get").catch(
      () => null
    ),
  ]);

  return json({ user, webhook });
};

export default function Index() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  );
}
