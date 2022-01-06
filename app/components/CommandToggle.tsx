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
    <div className="flex items-center content-center">
      <div className="flex-1">{name}</div>
      <Switch
        className={`${
          isChecked ? "bg-teal-900" : "bg-teal-700"
        } relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        checked={isChecked}
        onChange={changeHandler}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${isChecked ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
}
