import { LoaderFunction, redirect, useLoaderData } from "remix";
import { makeApiRequest } from "~/utils/api.server";
import { Server } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ params, request }) => {
  const guildId = params.id;
  try {
    const guild = await makeApiRequest<Server>(
      request,
      `/v1/guilds/${guildId}`,
      "get"
    );

    console.log(guild);

    return guild;
  } catch (err) {
    throw redirect("/dashboard");
  }
};

export default function Index() {
  const server = useLoaderData<Server>();

  return (
    <div className="mt-3 py-4 pb-8">
      {server.name}
      <p>{server.botName}</p>
    </div>
  );
}
