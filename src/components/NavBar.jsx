import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <ul className="flex flex-row gap-4">
      <li>
        <Link
          to="signin"
          className="w-24 block bg-[#201E43] text-white text-center py-2 rounded-lg hover:scale-110 focus:scale-110 transition-all"
        >
          Sign in
        </Link>
      </li>
      <li>
        <Link
          to="signup"
          className="w-24 block bg-[#201E43] text-white text-center py-2 rounded-lg hover:scale-110 focus:scale-110 transition-all"
        >
          Sign up
        </Link>
      </li>
    </ul>
  );
};
