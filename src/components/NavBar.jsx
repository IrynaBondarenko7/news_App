import { Link } from "react-router-dom";

export const NavBar = ({ close }) => {
  return (
    <ul className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <li>
        <Link
          onClick={close}
          to="signin"
          className="w-24 block bg-[#201E43] text-white text-center py-2 rounded-lg hover:scale-110 focus:scale-110 transition-all"
        >
          Sign in
        </Link>
      </li>
      <li>
        <Link
          onClick={close}
          to="signup"
          className="w-24 block bg-[#201E43] text-white text-center py-2 rounded-lg hover:scale-110 focus:scale-110 transition-all"
        >
          Sign up
        </Link>
      </li>
    </ul>
  );
};
