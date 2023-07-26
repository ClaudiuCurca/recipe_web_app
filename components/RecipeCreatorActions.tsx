"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteRecipe, fetchToken } from "@/lib/actions";

type Props = {
  recipeId: string;
};

const RecipeCreatorActions = ({ recipeId }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handledeleteRecipe = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteRecipe(recipeId, token);

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2 absolute top-5 right-5">
      <Link
        href={`/edit-recipe/${recipeId}`}
        className="flex justify-center items-center p-2 text-gray-100 bg-light-white-400 rounded-lg text-sm font-medium bg-gray-200"
      >
        <Image src="/pencile.svg" width={17} height={17} alt="edit" />
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flex justify-center items-center p-2 text-gray-100 hover:bg-red-600 rounded-lg text-sm font-medium ${
          isDeleting ? "bg-red-500" : "bg-gray-500"
        }`}
        onClick={handledeleteRecipe}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </div>
  );
};

export default RecipeCreatorActions;
