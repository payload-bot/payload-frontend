import { LoaderFunction, useLoaderData } from "remix";
import { requireUser } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  return { message: "you're logged in 😎", data: user };
};

export default function Index() {
  const data = useLoaderData<{ message: string; data?: any }>();
  return (
    <div>
      <p>{data.message}</p>
      <p>{JSON.stringify(data.data)}</p>
    </div>
  );
}
