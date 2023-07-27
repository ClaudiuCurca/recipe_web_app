"use client";
import { RecipeInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import RecipeCard from "@/components/RecipeCard";
import { fetchAllRecipes, fetchRecipesByTitle } from "@/lib/actions";
import React, { useEffect, useState } from "react";

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

type PaginationInterface = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

type Props = {
  searchParams: {
    category?: string | null;
    endcursor?: string;
    searchTerm?: string | null;
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = ({ searchParams: { category, endcursor, searchTerm } }: Props) => {
  const [recipes, setRecipes] = useState<{ node: RecipeInterface }[]>();

  const [pagination, setPagination] = useState<PaginationInterface | undefined>(
    undefined
  );

  const [prevEndCursor, setPrevEndCursor] = useState<string | undefined>(
    endcursor
  );

  useEffect(() => {
    const getRecipes = async () => {
      try {
        let data;
        if (!searchTerm) {
          data = (await fetchAllRecipes(category, endcursor)) as RecipeSearch;
        } else {
          data = (await fetchRecipesByTitle(
            searchTerm,
            endcursor
          )) as RecipeSearch;
        }

        if (endcursor && prevEndCursor !== endcursor) {
          const newRecipes = data?.recipeSearch?.edges || [];

          if (recipes) {
            setRecipes([...recipes, ...newRecipes]);
          } else {
            setRecipes(recipes);
          }

          const pagination = data?.recipeSearch?.pageInfo;
          setPagination(pagination);
        } else {
          const recipes = data?.recipeSearch?.edges || [];

          setRecipes(recipes);

          const pagination = data?.recipeSearch?.pageInfo;
          setPagination(pagination);
        }

        setPrevEndCursor(endcursor);
      } catch (err) {
        console.log(err);
      }
    };

    getRecipes();
  }, [category, endcursor, searchTerm]);

  if (!recipes) {
    return (
      <section className="h-96">
        <Categories />
        <p className="flex justify-center items-center mt-10 text-lg ">
          Loading...
        </p>
      </section>
    );
  }

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
        {recipes?.map(({ node }: { node: RecipeInterface }) => (
          <RecipeCard key={node?.id} node={node} />
        ))}
      </section>

      {pagination && (
        <LoadMore
          startCursor={pagination.startCursor}
          endCursor={pagination.endCursor}
          hasPreviousPage={pagination.hasPreviousPage}
          hasNextPage={pagination.hasNextPage}
        />
      )}
    </section>
  );
};

export default Home;
