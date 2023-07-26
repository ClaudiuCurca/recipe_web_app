import { RecipeInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import RecipeCard from "@/components/RecipeCard";
import { fetchAllRecipes } from "@/lib/actions";
import React from "react";

type RecipeSearch = {
  recipeSearch: {
    edges: { node: RecipeInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type Props = {
  searchParams: { category?: string | null; endcursor?: string };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllRecipes(category, endcursor)) as RecipeSearch;

  const recipes = data?.recipeSearch?.edges || [];

  const pagination = data?.recipeSearch?.pageInfo;

  if (recipes.length === 0) {
    return (
      <section className="h-96">
        <Categories />
        <p className="flex justify-center items-center mt-10 text-lg ">
          No recipes found
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2 justify-center">
      <Categories />
      <section className="self-center flex gap-10 flex-wrap justify-center md:justify-start py-10 sm:p-10 sm:scroll-bar-small ">
        {recipes.map(({ node }: { node: RecipeInterface }) => (
          <RecipeCard key={node?.id} node={node} />
        ))}{" "}
      </section>

      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;
