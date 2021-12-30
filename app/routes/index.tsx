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
      <main className="flex flex-col gap-7 items-center justify-center md:max-w-2xl max-w-md mx-auto my-10 text-center px-2">
        <h1 className="text-5xl text-gray-700 font-bold">
          TF2 Integration with <span className="text-sky-500">Payload</span>
        </h1>
        <p className="text-lg text-gray-500">
          Enjoy built-in utilities and features to integrate your Discord with
          TF2 services, including logs.tf, ETF2L, and more!
        </p>
        <section className="flex flex-row gap-5">
          <a
            href="#"
            target="_blank"
            className="px-10 py-2 text-lg shadow-md  bg-sky-400 hover:bg-sky-500 rounded-md text-gray-700 font-semibold"
          >
            Invite Payload
          </a>
          <a
            href="#features"
            className="px-10 py-2 text-lg shadow-md border border-gray-400 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            Features
          </a>
        </section>

        <section id="features">
          <div className="feature-one">Feature 1</div>
          <div className="feature-two">Feature 2</div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
