import { Link } from "react-router-dom";
import { SelectTopics } from "./SelectTopics";

export const Header = () => {
  return (
    <header className="shadow-lg py-3 fixed top-0 left-1/2 -translate-x-1/2 w-full bg-white z-10">
      <div className="container flex items-center gap-6 md:gap-20">
        <Link
          to="/"
          className="text-[#508C9B] bg-sky-200 p-2 rounded-md font-bold transition-all hover:text-slate-400"
        >
          TrendNews
        </Link>
        <SelectTopics />
      </div>
    </header>
  );
};
