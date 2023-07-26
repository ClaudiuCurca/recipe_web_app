import { UserProfile } from "@/common.types";
import Profile from "@/components/Profile";
import { getUserRecipes } from "@/lib/actions";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = async ({ params }: Props) => {
  const result = (await getUserRecipes(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user)
    return (
      <p className="no-result-text flex justify-center items-center mt-10 sm:text-xl">
        Failed to fetch user info
      </p>
    );

  return <Profile user={result.user} />;
};

export default ProfilePage;
