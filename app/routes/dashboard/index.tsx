import { useLoaderData, useOutletContext } from "remix";
import { User } from "~/utils/contracts";

export default function Index() {
  const user = useOutletContext<User>();

  console.log(user);

  return (
    <div>
      <p>Logged in and on dashboard!</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
