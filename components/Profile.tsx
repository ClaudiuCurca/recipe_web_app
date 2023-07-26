import { UserProfile, RecipeCardInterface } from "@/common.types";
import Image from "next/image";
import React from "react";
import RecipeCard from "./RecipeCard";

type Props = {
  user: UserProfile;
};

const Profile = ({ user }: Props) => {
  return (
    <section className="container mx-auto sm:px-4 sm:py-8">
      <div className="flex items-center justify-center">
        <div className="sm:bg-white shadow rounded-lg p-1 sm:p-8 w-full sm:w-11/12">
          <div className="mb-4">
            <div className="relative w-24 h-24 mx-auto">
              <Image
                src={user.avatarUrl}
                alt="Avatar"
                className="object-cover rounded-full w-full h-full"
                layout="fill"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          {user.email && <p className="text-gray-600 mb-4">{user.email}</p>}
          <p className="text-gray-800">
            {user.description || "No description provided."}
          </p>
          <h2 className="mt-5 text-2xl color_primary">Recipes</h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5 my-5">
            {user.recipes.edges.length > 0 ? (
              <>
                {" "}
                {user.recipes.edges.map(
                  ({ node }: { node: RecipeCardInterface }) => (
                    <RecipeCard node={node}></RecipeCard>
                  )
                )}
              </>
            ) : (
              <p className="mt-5">User hasn't added any recipes yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
