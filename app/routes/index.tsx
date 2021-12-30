import { LoaderFunction, useLoaderData } from "remix";
import Header from "~/components/Header";
import { getUserInfo } from "~/server/session.server";
import { User } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserInfo(request);

  return user;
};

export default function Index() {
  const user = useLoaderData<User>();

  return (
    <>
      <Header user={user} />
      some content!
      {/* <Footer /> */}
    </>
  );
}
