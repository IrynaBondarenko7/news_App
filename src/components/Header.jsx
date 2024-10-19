import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { SelectTopics } from "./SelectTopics";
import { NavBar } from "./NavBar";
import { UserContext } from "../components/UserContext";
import { BurgerMenu } from "./BurgerMenu";

export const Header = () => {
  const { user } = useContext(UserContext);
  const userPagePath = `/users/${user}`;
  let userName = "";
  if (user) {
    userName = user.slice(0, 1).toUpperCase();
  }

  let [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="shadow-lg py-3 fixed top-0 left-1/2 -translate-x-1/2 w-full bg-white z-10">
      <div className="container flex items-center justify-between gap-3">
        <Link
          to="/"
          className="hidden md:block text-[#508C9B] bg-sky-200 p-2 rounded-md font-bold transition-all hover:text-slate-400"
        >
          TrendNews
        </Link>

        <SelectTopics />
        <button
          onClick={openMenu}
          className="block md:hidden rounded-md bg-[#201E43] py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <GiHamburgerMenu />
        </button>
        <BurgerMenu isOpen={isOpen} close={closeMenu}>
          <Link
            onClick={closeMenu}
            to="/"
            className="text-[#508C9B] bg-sky-200 p-2 rounded-md font-bold transition-all hover:text-slate-400"
          >
            TrendNews
          </Link>
          {user ? (
            <Link
              onClick={closeMenu}
              to={userPagePath}
              className=" text-[#201E43] font-bold border-2  border-transparent border-b-[#508C9B]"
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
              className="w-10 h-10 rounded-full bg-[#508C9B] flex justify-center items-center text-white "
            >
              <p>{userName}</p>
            </Link>
          ) : (
            <NavBar />
          )}
        </div>
      </div>
    </header>
  );
};
