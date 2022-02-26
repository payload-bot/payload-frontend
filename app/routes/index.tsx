import { LoaderFunction, useLoaderData } from "remix";
import Footer from "~/components/Footer";
import LandingHeader from "~/components/LandingHeader";
import { getUserInfo } from "~/server/session.server";
import { User } from "~/utils/contracts";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserInfo(request);

  return user;
};

export default function Index() {
  const user = useLoaderData<User>();

  return (
    <div className="relative min-h-max">
      <LandingHeader user={user} />
      <main className="mx-auto my-10 flex max-w-md flex-col items-center justify-center gap-7 px-2 text-center md:max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-slate-200 sm:text-4xl md:text-5xl">
          TF2 Integration with <span className="text-sky-600">Payload</span>
        </h1>
        <p className="text-md text-gray-500 dark:text-gray-100 md:text-lg">
          Enjoy built-in utilities and features to integrate your Discord with
          TF2 services, including logs.tf, ETF2L, and more!
        </p>
        <section className="flex w-full flex-col justify-center gap-3 md:flex-row md:gap-5">
          <a
            href="/invite"
            target="_blank"
            className="w-full rounded-md bg-sky-400 py-2 text-lg font-semibold text-gray-700 shadow-md shadow-sky-400/40 transition duration-75 hover:bg-sky-500 md:w-max md:px-10"
          >
            Invite Payload
          </a>
          <a
            href="#features"
            className="w-full rounded-md border border-gray-400 py-2 text-lg font-semibold text-gray-700 shadow-md transition duration-75 hover:bg-gray-100 dark:border-slate-800 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 dark:hover:text-white md:w-max md:px-10"
          >
            Features
          </a>
        </section>
      </main>

      <section
        id="features"
        className="mx-auto mt-[150px] flex max-w-screen-lg flex-row flex-wrap gap-36 py-2 px-4 md:flex-col"
      >
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-slate-200 md:text-left md:text-4xl">
              Pushcart Leaderboard
            </h1>
            <p className="text-md text-center font-normal text-gray-500 dark:text-slate-100 sm:text-lg md:text-left">
              Push the cart to victory as you compete with other servers to be
              on the top!
            </p>
          </div>
          <img
            src="/features/feature-image-1.svg"
            alt="pushcart leaderboard featurette"
            className="m-2 rounded-lg shadow-2xl shadow-gray-500 dark:shadow-slate-800 md:max-h-72"
          />
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-slate-200 md:text-left md:text-4xl">
              Automatic Previews
            </h1>
            <p className="text-md text-center font-normal text-gray-500 dark:text-slate-100 sm:text-lg md:text-left">
              View your amazing logs automagically within Discord, no more
              waiting on friends to see your amazing games!
            </p>
          </div>
          <img
            src="/features/feature-image-2.svg"
            alt="auto responses featurette"
            className="m-2 rounded-lg shadow-2xl shadow-gray-500 dark:shadow-slate-800 md:max-h-72"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-slate-200 md:text-left md:text-4xl">
              And more!
            </h1>
            <p className="text-md text-center font-normal text-gray-500 dark:text-slate-100 sm:text-lg md:text-left">
              From silly 8ball to the moderation-focused snipe, there's fun
              sprinkled into utilities. Don't worry- you can always disable
              commands that don't fit the room.
            </p>
          </div>
          <img
            src="/features/feature-image-3.svg"
            alt="auto responses featurette"
            className="m-2 rounded-lg shadow-2xl shadow-gray-500 dark:shadow-slate-800 md:max-h-72"
          />
        </div>
      </section>

      <section className="my-16 flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-medium text-gray-200 dark:text-white md:text-4xl">
          What are you waiting for? Invite now!
        </h1>
        <a
          href="/invite"
          target="_blank"
          className=" rounded-md bg-slate-500 py-2 px-4 text-lg font-semibold text-gray-800 transition duration-200 hover:bg-slate-600"
        >
          Invite Payload
        </a>
      </section>

      {/* Blobs */}
      <img
        src="/blob-main.svg"
        className="absolute top-0 right-0 -z-10 opacity-30"
      />
      <img
        src="/blob-secondary.svg"
        className="absolute top-1/4 -left-1/4 -z-10 h-1/2 md:h-3/4 opacity-30 sm:-left-3/4"
      />

      <Footer />
    </div>
  );
}
