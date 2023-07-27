import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import NavbarSearch from "./NavbarSearch";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex flex-col justify-center navbar px-5 border border-b-black-500 bg-orange-300 shadow-lg shadow-black-500">
      <div className="flex justify-between items-center h-16">
        <Link href="/" className="app_title text-white sm:text-2xl">
          Online Recipes
        </Link>

        <div className="flex justify-center items-center gap-4 text-sm sm:text-base">
          {session?.user ? (
            <>
              <ProfileMenu session={session} />

              <Link href="/create-recipe" className="text-white">
                Add Recipe
              </Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </div>
      <NavbarSearch />
    </nav>
  );
};

export default Navbar;
