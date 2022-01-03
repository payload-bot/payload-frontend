import { LoaderFunction, useLoaderData } from "remix";
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
      <main className="flex flex-col gap-7 items-center justify-center md:max-w-2xl max-w-md mx-auto my-10 text-center px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-700 dark:text-slate-200 font-bold">
          TF2 Integration with <span className="text-sky-600">Payload</span>
        </h1>
        <p className="text-md md:text-lg text-gray-500 dark:text-gray-100">
          Enjoy built-in utilities and features to integrate your Discord with
          TF2 services, including logs.tf, ETF2L, and more!
        </p>
        <section className="flex flex-col md:flex-row justify-center gap-3 md:gap-5 w-full">
          <a
            href="/invite"
            target="_blank"
            className="w-full md:w-max md:px-10 py-2 text-lg shadow-md shadow-sky-400/40 bg-sky-400 hover:bg-sky-500 rounded-md text-gray-700 font-semibold transition duration-75"
          >
            Invite Payload
          </a>
          <a
            href="#features"
            className="w-full md:w-max md:px-10 py-2 text-lg shadow-md border border-gray-400 dark:border-slate-800 rounded-md font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-500 dark:hover:text-white transition duration-75"
          >
            Features
          </a>
        </section>
      </main>

      <section
        id="features"
        className="mt-[150px] mx-auto max-w-screen-lg py-2 px-4 flex flex-wrap flex-row md:flex-col gap-36"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-center md:text-left md:text-4xl text-gray-700 dark:text-slate-200">
              Pushcart Leaderboard
            </h1>
            <p className="font-normal text-md sm:text-lg text-center md:text-left text-gray-500 dark:text-slate-100">
              Push the cart to victory as you compete with other servers to be
              on the top!
            </p>
          </div>
          <img
            src="/features/feature-image-1.svg"
            alt="pushcart leaderboard featurette"
            className="md:max-h-72 rounded-lg shadow-2xl shadow-gray-500 dark:shadow-slate-800 m-2"
          />
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-center md:text-left md:text-4xl text-gray-700 dark:text-slate-200">
              Automatic Previews
            </h1>
            <p className="font-normal text-md sm:text-lg text-center md:text-left text-gray-500 dark:text-slate-100">
              View your amazing logs automagically within Discord, no more
              waiting on friends to see your amazing games!
            </p>
          </div>
          <img
            src="/features/feature-image-2.svg"
            alt="auto responses featurette"
            className="md:max-h-72 rounded-lg shadow-2xl shadow-gray-500 dark:shadow-slate-800 m-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-center md:text-left md:text-4xl text-gray-700 dark:text-slate-200">
              And more!
            </h1>
            <p className="font-normal text-md sm:text-lg text-center md:text-left text-gray-500 dark:text-slate-100">
              From silly 8ball to the moderation-focused snipe, there's fun
              sprinkled into utilities. Don't worry- you can always disable
              commands that don't fit the room.
            </p>
          </div>
          <img
            src="/features/feature-image-3.svg"
            alt="auto responses featurette"
            className="md:max-h-72 rounded-lg shadow-2xl shadow-gray-500 dark:shadow-slate-800 m-2"
          />
        </div>
      </section>

      {/* Blobs */}
      <img
        src="/blob-main.svg"
        className="absolute top-0 right-0 -z-10 opacity-30"
      />
      <img
        src="/blob-secondary.svg"
        className="absolute -bottom-1/4 -left-1/4 sm:-left-3/4 -z-10 opacity-30 h-full"
      />

      {/* <Footer /> */}
    </div>
  );
}
