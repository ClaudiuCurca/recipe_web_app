import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex items-center justify-between h-16 navbar px-5 border border-b-orange-500 bg-white shadow-md shadow-b-orange-500">
      <Link href="/" className="app_title color_primary sm:text-2xl">
        Online Recipes
      </Link>

      <div className="flex justify-center items-center gap-4 text-sm sm:text-base">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-recipe">Add Recipe</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
