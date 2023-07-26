"use client";
import { useState } from "react";
import { RecipeInterface, SessionInterface } from "@/common.types";
import SelectMenu from "./SelectMenu";
import FormField from "./FormField";
import { categories } from "@/constants";
import Image from "next/image";
import { createNewRecipe, fetchToken, updateRecipe } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  session: SessionInterface;
  type: "add" | "edit";
  recipe?: RecipeInterface;
};

const RecipeForm = ({ session, type, recipe }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    image: recipe?.image || "",
    category: recipe?.category || "",
  });
  const [categoryError, setCagetoryError] = useState(false);

  const router = useRouter();

  const handleStateChange = (fieldName: string, value: string) => {
    if (categoryError) setCagetoryError(false);
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //error handling
    if (form.category === "") {
      setCagetoryError(true);
    }

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "add") {
        await createNewRecipe(form, session?.user?.id, token);

        router.push("/");
      }

      if (type === "edit") {
        await updateRecipe(form, recipe?.id as string, token);

        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="sm:bg-white mt-10 mb-24  rounded-md  w-full sm:w-4/5  lg:w-2/3 p-5 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {" "}
      <div
        className={`flex justify-start items-center w-full lg:min-h-[400px] 
      min-h-[200px] relative border border-dashed border-gray-500 bg-gray-100`}
      >
        <label
          htmlFor="poster"
          className="flex justify-center items-center z-10 text-center w-full h-full p-20 text-gray-500 "
        >
          {!form.image && "Choose an image for your recipe"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "add" ? true : false}
          className="absolute z-30 w-full opacity-0 h-full cursor-pointer "
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        placeholder="Add a title for your recipe"
        value={form.title}
        onChange={(e) => handleStateChange("title", e?.target?.value)}
        minLength={2}
        maxLength={100}
      />
      <FormField
        isTextArea
        title="Description"
        placeholder="Describe the ingredients and the steps for the recipe"
        value={form.description}
        onChange={(e) => handleStateChange("description", e?.target?.value)}
      />
      <SelectMenu
        title="Category"
        value={form.category}
        options={categories}
        error={categoryError}
        onClick={(e) => handleStateChange("category", e.target.value)}
      />
      <button
        type="submit"
        className={`mt-5 px-5 py-1 text-lg capitalize bg-orange-500 self-center 
        rounded-md text-white hover:bg-orange-300 duration-200 disabled:bg-orange-300 disabled:pointer-events-none`}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? type === "add"
            ? "Adding recipe..."
            : "Editing recipe..."
          : ` ${type} recipe`}
      </button>
    </form>
  );
};

export default RecipeForm;
