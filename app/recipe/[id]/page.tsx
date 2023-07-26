import { RecipeInterface } from "@/common.types";
import RecipeCreatorActions from "@/components/RecipeCreatorActions";
import RelatedRecipes from "@/components/RelatedRecipes";
import { getRecipeDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";

const RecipeDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();

  const { recipe } = (await getRecipeDetails(id)) as {
    recipe: RecipeInterface;
  };

  return (
    <>
      <article className="sm:bg-white shadow-lg shadow-grey-200  rounded-lg lg:w-2/3 md:w-11/12 flex flex-col justify-center mx-auto md:my-10 p-2 sm:p-10 relative">
        <Image
          src={recipe.image}
          width={600}
          height={752}
          alt="recipe image"
          className="self-center"
        />
        <RecipeCreatorActions recipeId={recipe.id} />
        <h1 className="mt-10 text-xl sm:text-2xl">{recipe.title}</h1>
        <Link href={`/profile/${recipe.createdBy.id}`}>
          {" "}
          <h3 className="text-sm text-gray-400">By {recipe.createdBy.name}</h3>
        </Link>
        <p className="text-gray-600 mt-5 whitespace-pre-line">
          {recipe.description}
        </p>
      </article>
      <RelatedRecipes userId={recipe?.createdBy?.id} recipeId={recipe.id} />
    </>
  );
};

export default RecipeDetails;
