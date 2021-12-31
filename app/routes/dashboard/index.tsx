import { LoaderFunction, useLoaderData } from "remix";
import SelectServer from "~/components/SelectServer";
import { makeApiRequest } from "~/utils/api.server";
import { ServerList } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ request }) => {
  const guilds = await makeApiRequest(request, "/v1/guilds", "get");

  return guilds;
};

export default function Index() {
  const guilds = useLoaderData<ServerList[]>();

  return (
    <div className="mt-3 py-4 pb-8">
      <h1 className="text-center font-bold text-lg md:text-2xl lg:text-3xl">
        Your Servers
      </h1>
      <main className="mt-4 flex flex-col gap-5 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-4xl mx-auto">
        {guilds.map((guild) => (
          <SelectServer key={guild.id} server={guild} />
        ))}
      </main>
    </div>
  );
}
