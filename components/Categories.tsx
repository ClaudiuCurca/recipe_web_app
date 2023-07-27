"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categories } from "@/constants";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (filter: string) => {
    router.push(`${pathName}?category=${filter}`);
  };

  return (
    <div className="flex justify-between w-full gap-5 flex-wrap">
      <ul className="flex gap-2 p-2 overflow-auto categories_list border border-b-orange-300 w-full">
        {categories.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-orange-300 text-white font-medium"
                : "font-normal"
            } duration-500 px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
