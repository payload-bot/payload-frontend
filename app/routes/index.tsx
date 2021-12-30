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
        <h1 className="text-2xl sm:text-3xl md:text-5xl text-gray-700 font-bold">
          TF2 Integration with <span className="text-sky-500">Payload</span>
        </h1>
        <p className="text-md md:text-lg text-gray-500">
          Enjoy built-in utilities and features to integrate your Discord with
          TF2 services, including logs.tf, ETF2L, and more!
        </p>
        <section className="flex flex-col md:flex-row justify-center gap-3 md:gap-5 w-full">
          <a
            href="#"
            target="_blank"
            className="w-full md:w-max md:px-10 py-2 text-lg shadow-md bg-sky-400 hover:bg-sky-500 rounded-md text-gray-700 font-semibold"
          >
            Invite Payload
          </a>
          <a
            href="#features"
            className="w-full md:w-max md:px-10 py-2 text-lg shadow-md border border-gray-400 rounded-md font-semibold text-gray-700 hover:bg-gray-100"
          >
            Features
          </a>
        </section>
      </main>

      <section
        id="features"
        className="mt-[150px] mx-auto max-w-screen-lg py-2 px-4 flex flex-wrap flex-row md:flex-col gap-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-center md:text-left md:text-4xl text-gray-700">
              Pushcart Leaderboard
            </h1>
            <p className="font-normal text-md sm:text-lg text-center md:text-left text-gray-500">
              Push the cart to victory as you compete with other servers to be
              on the top!
            </p>
          </div>
          <img
            src="/features/feature-image-1.svg"
            alt="pushcart leaderboard featurette"
            className="md:max-h-72 rounded-lg shadow-2xl shadow-gray-500"
          />
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}
