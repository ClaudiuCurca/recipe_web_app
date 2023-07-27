"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchTerm);
    router.push("/?searchTerm=" + searchTerm);
  };

  return (
    <form
      className="w-full md:w-1/3 lg:1/2 mx-auto h-8 flex justify-center items-center md: md:-mt-16 md:h-16"
      onSubmit={handleSubmitSearch}
    >
      <input
        className="rounded-full border border-orange-300 -mt-4 md:mt-0 px-3 py-1 w-full outline-none"
        placeholder="Search for recipe"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      ></input>
      <button className="-mt-4 md:mt-0 -ml-7 rounded-full" type="submit">
        <Image
          src={"/magnifying-glass.svg"}
          width={15}
          height={15}
          alt="magnifying glass"
        />
      </button>
    </form>
  );
};

export default NavbarSearch;
