"use client";

import { useRouter } from "next/navigation";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;
    router.push(newPathname);
  };

  return (
    <div className="flex gap-5 justify-center items-center mb-5">
      {hasNextPage && (
        <button
          className="p-2 bg-orange-100 rounded-md"
          onClick={() => handleNavigation("next")}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default LoadMore;
