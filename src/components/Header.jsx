import { Link } from "react-router-dom";
import { SelectTopics } from "./SelectTopics";

export const Header = () => {
  return (
    <header className="shadow-lg py-3">
      <div className="container flex items-center gap-6 md:gap-20">
        <Link
          to="/"
          className="text-[#508C9B] bg-sky-200 p-2 rounded-md font-bold"
        >
          TrendNews
        </Link>
        <SelectTopics />
      </div>
    </header>
  );
};
