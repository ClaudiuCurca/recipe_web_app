import React from "react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";

const CreateRecipe = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <section className=" flex flex-col justify-center items-center mt-10">
      <h2 className="text-2xl mt-10 sm:text-3xl color_primary">
        Add a new recipe
      </h2>

      <RecipeForm session={session} type="add" />
    </section>
  );
};

export default CreateRecipe;
