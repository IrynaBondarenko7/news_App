import { useContext } from "react";
import { Link } from "react-router-dom";
import { SelectTopics } from "./SelectTopics";
import { NavBar } from "./NavBar";
import { UserContext } from "../components/UserContext";

export const Header = () => {
  const { user } = useContext(UserContext);
  const userPagePath = `/users/${user}`;
  let userName = "";
  if (user) {
    userName = user.slice(0, 1).toUpperCase();
  }

  return (
    <header className="shadow-lg py-3 fixed top-0 left-1/2 -translate-x-1/2 w-full bg-white z-10">
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="text-[#508C9B] bg-sky-200 p-2 rounded-md font-bold transition-all hover:text-slate-400"
        >
          TrendNews
        </Link>

        <SelectTopics />
        {user ? (
          <Link
            to={userPagePath}
            className="w-10 h-10 rounded-full bg-[#508C9B] flex justify-center items-center text-white"
          >
            <p>{userName}</p>
          </Link>
        ) : (
          <NavBar />
        )}
      </div>
    </header>
  );
};
