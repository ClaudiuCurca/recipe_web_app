"use client";
import { RecipeCardInterface } from "@/common.types";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ node }: { node: RecipeCardInterface }) => {
  return (
    <div className="max-w-sm mx-1 recipe-card">
      <figure className="flex flex-col max-w-sm h-64 rounded-xl overflow-hidden bg-orange-300 shadow-md shadow-black-200 hover:shadow-md hover:shadow-orange-300 duration-200 ">
        <div className="hover:-translate-y-16 duration-200 recipe_card">
          <div className="relative">
            <Link href={`/recipe/${node.id}`}>
              <Image
                src={node?.image}
                width={960}
                height={640}
                alt="recipe image"
                className="h-64 object-cover cursor-pointer"
              />
            </Link>
          </div>

          <section className="p-2 text-white flex flex-col justify-center h-16 ">
            <div className="w-fit">
              <Link href={`/?category=${node.category}`}>
                <p className="flex gap-1 cursor-pointer w-fit">
                  <Image
                    src="/spoon-knife.svg"
                    alt="spoon"
                    width={15}
                    height={15}
                    className="svg"
                  />
                  {node.category}
                </p>
              </Link>
            </div>
            {node.createdBy ? (
              <div className="w-fit">
                <Link href={`/profile/${node.createdBy.id}`}>
                  <p className="flex gap-2 cursor-pointer">
                    by {node.createdBy.name}
                    <Image
                      src={node.createdBy.avatarUrl}
                      width={22}
                      height={8}
                      alt="profile picture"
                      className="rounded-full"
                    />
                  </p>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </section>
        </div>
      </figure>
      <h3 className=" rounded-md p-1 text-lg">{node.title}</h3>
    </div>
  );
};

export default RecipeCard;
