import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { SelectTopics } from "./SelectTopics";
import { NavBar } from "./NavBar";
import { UserContext } from "../components/UserContext";
import { BurgerMenu } from "./BurgerMenu";
import { getUser } from "../api";

export const Header = () => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const userPagePath = `/users/${user}`;

  let [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUser(user);
        setUserInfo(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <header className="shadow-lg py-3 fixed top-0 left-1/2 -translate-x-1/2 w-full bg-white z-10">
      <div className="container flex items-center justify-between gap-3">
        <Link
          to="/"
          className="hidden md:block text-main bg-sky-200 p-2 rounded-md font-bold transition-all hover:text-slate-400"
        >
          TrendNews
        </Link>
        <SelectTopics />
        <button
          onClick={openMenu}
          className="block md:hidden rounded-md bg-accent py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <GiHamburgerMenu />
        </button>
        <BurgerMenu isOpen={isOpen} close={closeMenu}>
          <Link
            onClick={closeMenu}
            to="/"
            className="text-main bg-sky-200 p-2 rounded-md font-bold transition-all hover:text-slate-400"
          >
            TrendNews
          </Link>
          {user ? (
            <Link
              onClick={closeMenu}
              to={userPagePath}
              className=" text-accent font-bold border-2  border-transparent border-b-main"
            >
              <p>My profile</p>
            </Link>
          ) : (
            <NavBar close={closeMenu} />
          )}
        </BurgerMenu>
        <div className="hidden md:block">
          {user ? (
            <Link
              to={userPagePath}
              className="w-10 h-10 rounded-full bg-main flex justify-center items-center text-white "
            >
              {!loading && userInfo?.avatar_url && (
                <img
                  src={userInfo.avatar_url}
                  alt="user avatar"
                  className="w-10 h-10 mx-auto rounded-full object-contain border-2 border-main"
                />
              )}
            </Link>
          ) : (
            <NavBar />
          )}
        </div>
      </div>
    </header>
  );
};
