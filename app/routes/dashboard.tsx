import { LoaderFunction, Outlet, useLoaderData } from "remix";
import Header from "~/components/Header";
import { requireUser } from "~/server/session.server";
import { User } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  return user;
};

export default function Index() {
  const user = useLoaderData<User>();

  return (
    <>
      <Header user={user} />
      <Outlet context={user} />
    </>
  );
}
