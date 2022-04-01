import { MetaFunction } from "remix";
import Footer from "~/components/Footer";
import Component from "~/content/legal/terms.mdx";

export const meta: MetaFunction = () => {
  return {
    title: "Terms of Service - payload.tf",
    description: "Payload's terms of service",
  };
};

export default function Privacy() {
  return (
    <>
      <div className="prose mx-auto mt-6 min-h-screen max-w-xs pb-10 dark:prose-invert sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-4xl">
        <Component />
      </div>
      <Footer />
    </>
  );
}
