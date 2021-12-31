import { LoaderFunction, useLoaderData } from "remix";
import { makeApiRequest } from "~/utils/api.server";
import { ServerList } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ request }) => {
  const guilds = await makeApiRequest(request, "/v1/guilds", "get");

  return guilds;
};

export default function Index() {
  const guilds = useLoaderData<ServerList[]>();

  return (
    <div>
      <p>You've got {guilds.length} guilds waiting to be managed</p>
    </div>
  );
}
