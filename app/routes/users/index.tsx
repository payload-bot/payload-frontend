import { LoaderFunction, useLoaderData } from "remix";
import { getUserSession } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);

  console.log(session.get("userId"));

  if (!session.data) {
    return { message: "not logged in" };
  } else {
    return { message: "you're logged in 😎", data: session.data };
  }
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
