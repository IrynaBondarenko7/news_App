import { Link } from "react-router-dom";

export const NotFoundArticle = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <img
        src="../../public/photo_5431614177841112514_m.jpg"
        alt="cat"
        width="50%"
      />
      <div className="text-center">
        <p className="text-6xl font-bold">404</p>
        <h2 className="font-bold ">Uh oh we have a problem</h2>
        <Link
          to="/"
          className="mt-6 block py-3 px-4 bg-violet-600 text-white rounded-lg"
        >
          Take me away
        </Link>
      </div>
    </div>
  );
};
