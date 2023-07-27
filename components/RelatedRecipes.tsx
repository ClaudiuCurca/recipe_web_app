import { UserProfile, RecipeInterface } from "@/common.types";
import { getUserRecipes } from "@/lib/actions";
import React from "react";
import RecipeCard from "./RecipeCard";

type Props = {
  userId: string;
  recipeId: string;
};

const RelatedRecipes = async ({ userId, recipeId }: Props) => {
  const result = (await getUserRecipes(userId, 4)) as { user?: UserProfile };

  const filteredRecipes = result?.user?.recipes?.edges?.filter(
    ({ node }: { node: RecipeInterface }) => node?.id !== recipeId
  );

  if (filteredRecipes?.length === 0) {
    return <></>;
  }

  return (
    <section className="p-5 border border-t-orange-300">
      <h2 className="text-xl mb-5">Other recipes by {result.user?.name}</h2>
      <div className="flex justify-center flex-wrap gap-5">
        {filteredRecipes?.map(({ node }) => (
          <RecipeCard node={node} />
        ))}
      </div>
    </section>
  );
};

export default RelatedRecipes;
