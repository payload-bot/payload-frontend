import React from "react";
import { CheckCircleIcon, BanIcon } from "@heroicons/react/solid";

type AlertProps = {
  type: "success" | "failed";
  message?: string;
};

export default function Alert({ type, message }: AlertProps) {
  if (type === "success") {
    return (
      <div className="flex flex-row gap-1 items-center py-2 px-4 bg-green-300 rounded-lg border-l-4 border-l-green-600">
        <CheckCircleIcon className="w-8 h-8 text-green-800" />
        <p className="font-medium text-lg text-green-800">
          {message ?? "Success"}
        </p>
      </div>
    );
  }

  if (type === "failed") {
    return (
      <div className="flex flex-row gap-1 items-center py-2 px-4 bg-red-200 rounded-lg border-l-4 border-l-red-500">
        <BanIcon className="w-8 h-8 text-red-700" />
        <p className="font-medium text-lg text-red-700">
          {message ?? "Failed"}
        </p>
      </div>
    );
  }

  return null;
}
