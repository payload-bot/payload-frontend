import { Switch } from "@headlessui/react";
import React, { useState } from "react";

type CommandToggleProps = {
  name: string;
  checked: boolean;
  notifyFunction: (cmdName: string, checked: boolean) => any;
};

export default function CommandToggle({
  name,
  checked,
  notifyFunction,
}: CommandToggleProps) {
  const [isChecked, setIsChecked] = useState(!checked);

  function changeHandler() {
    setIsChecked((prev) => !prev);
    notifyFunction(name, isChecked);
  }

  return (
    <div className="flex content-center items-center py-2">
      <div className="flex-1 text-lg font-medium text-gray-600 dark:text-slate-200">
        {name}
      </div>
      <Switch
        className={`${
          isChecked ? "bg-blue-500/50" : "bg-slate-200/50"
        } relative inline-flex h-[20px] w-[50px] flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        checked={isChecked}
        onChange={changeHandler}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            isChecked
              ? "translate-x-6 bg-blue-400"
              : "translate-x-[-2px] bg-slate-300"
          }
            pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full  shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
