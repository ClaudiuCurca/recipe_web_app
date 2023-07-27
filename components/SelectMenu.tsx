type Props = {
  title: string;
  value: string;
  options: Array<string>;
  onClick: (e: any) => void;
  error: boolean;
};

import { Menu } from "@headlessui/react";
import Image from "next/image";

const CustomMenu = ({ title, value, options, onClick, error }: Props) => {
  return (
    <div className="flex items-center justify-start w-full gap-4 relative ">
      <label
        htmlFor={title}
        className={`${error ? "text-red-500" : "text-black"}`}
      >
        {title}
      </label>
      <Menu as="div" className="self-start relative" suppressHydrationWarning>
        <div className="">
          <Menu.Button
            className={`border flex justify-center items-center gap-4 w-full 
            rounded-md bg-light-white-100 p-2 text-base outline-none capitalize bg-gray-100 ${
              error ? "text-red-500" : "text-black"
            }`}
          >
            {value ? value : error ? `You must select a ${title}` : `${title}`}
            <Image
              src="/arrow-down.svg"
              width={10}
              height={5}
              alt="Arrow down"
            />
          </Menu.Button>
        </div>
        <Menu.Items className=" flex flex-col justify-start items-start absolute left-0 mt-2 sm:min-w-[200px] w-fit max-h-64 origin-top-right rounded-xl bg-gray-100 border border-nav-border shadow-menu overflow-y-auto">
          {options.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className=" text-left w-full px-5 py-2 text-sm hover:bg-light-white-100 self-start whitespace-nowrap capitalize"
                onClick={onClick}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
