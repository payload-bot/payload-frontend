import React from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

type AlertProps = {
  type: "success" | "failed";
  message?: string;
};

export default function Alert({ type, message }: AlertProps) {
  if (type === "success") {
    return (
      <div className="flex flex-row gap-1 items-center py-2 px-4 bg-green-300 dark:bg-green-600/30 rounded-lg border-l-4 border-l-green-600 dark:border-l-green-700">
        <CheckCircleIcon className="w-8 h-8 text-green-600" />
        <p className="font-medium text-lg text-green-600">
          {message ?? "Success"}
        </p>
      </div>
    );
  }

  if (type === "failed") {
    return (
      <div className="flex flex-row gap-1 items-center py-2 px-4 bg-red-200 dark:bg-red-400/30 rounded-lg border-l-4 border-l-red-500 dark:border-l-red-700">
        <ExclamationCircleIcon className="w-8 h-8 text-red-700 dark:text-red-700" />
        <p className="font-medium text-lg text-red-700 dark:text-red-700">
          {message ?? "Failed"}
        </p>
      </div>
    );
  }

  return null;
}
