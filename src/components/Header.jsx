import { Link } from "react-router-dom";
import { SelectTopics } from "./SelectTopics";

export const Header = () => {
  return (
    <header>
      <div className="container flex items-center gap-20">
        <Link to="/" className="text-blue-900 bg-sky-200 p-3 rounded-md">
          TrendNews
        </Link>
        <SelectTopics />
      </div>
    </header>
  );
};
