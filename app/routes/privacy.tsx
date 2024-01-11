import { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import Component from "~/content/legal/privacy.mdx";

export function MetaFunction() {
  return [
   { title: "Privacy Policy - payload.tf" }, 
   { description: "Payload's privacy policy" },
  ];
}

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
