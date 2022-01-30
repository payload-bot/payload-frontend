import React from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

type AlertProps = {
  type: "success" | "failed";
  message?: string;
};

export default function Alert({ type, message }: AlertProps) {
  if (type === "success") {
    return (
      <div className="flex flex-row items-center gap-1 rounded-lg border-l-4 border-l-green-600 bg-green-300 py-2 px-4 dark:border-l-green-700 dark:bg-green-600/30">
        <CheckCircleIcon className="h-8 w-8 text-green-600" />
        <p className="text-lg font-medium text-green-600">
          {message ?? "Success"}
        </p>
      </div>
    );
  }

  if (type === "failed") {
    return (
      <div className="flex flex-row items-center gap-1 rounded-lg border-l-4 border-l-red-500 bg-red-200 py-2 px-4 dark:border-l-red-700 dark:bg-red-400/30">
        <ExclamationCircleIcon className="h-8 w-8 text-red-700 dark:text-red-700" />
        <p className="text-lg font-medium text-red-700 dark:text-red-700">
          {message ?? "Failed"}
        </p>
      </div>
    );
  }

  return null;
}
