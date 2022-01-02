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
      {guilds.length > 0 ? (
        <h1 className="text-gray-700 text-center font-bold text-lg md:text-2xl lg:text-3xl">
          Your Servers
        </h1>
      ) : (
        <div className="w-full mx-auto max-w-lg text-lg space-y-2">
          <h1 className="text-gray-700 text-center font-bold text-lg md:text-2xl lg:text-3xl">
            No Servers
          </h1>
          <p className="text-center text-gray-400">
            You have no servers that you can manage. You should{" "}
            <a
              className="underline decoration-2 decoration-blue-500"
              href="https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-"
              rel="noreferrer"
            >
              try creating your own server
            </a>{" "}
            and invite Payload to your new server!
          </p>
        </div>
      )}

      <main className="mt-4 flex flex-col gap-5 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-4xl mx-auto">
        {guilds.length > 0
          ? guilds.map((guild) => (
              <SelectServer key={guild.id} server={guild} />
            ))
          : null}
      </main>
    </div>
  );
}
