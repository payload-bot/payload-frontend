import { LoaderFunction, useLoaderData } from "remix";
import { requireUser } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  return { data: user };
};

export default function Index() {
  const data = useLoaderData<{ data: any }>();
  return (
    <div>
      <p>settings!</p>
    </div>
  );
}
