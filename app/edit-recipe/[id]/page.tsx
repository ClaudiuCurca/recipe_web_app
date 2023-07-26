import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import { getRecipeDetails } from "@/lib/actions";
import { RecipeInterface } from "@/common.types";

const EditRecipe = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getRecipeDetails(id)) as { recipe?: RecipeInterface };
  const { recipe } = result;

  return (
    <section className="flex flex-col justify-center items-center mt-10">
      <h2 className="text-2xl mt-10 sm:text-3xl color_primary">Edit recipe</h2>

      <RecipeForm session={session} type="edit" recipe={recipe} />
    </section>
  );
};

export default EditRecipe;
