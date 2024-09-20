import { Link } from "react-router-dom";

export const NotFoundArticle = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <img src="/article_not_found.jpg" alt="cat" width="50%" />
      <div className="text-center">
        <p className="text-6xl font-bold">404</p>
        <h2 className="font-bold ">Uh oh we have a problem</h2>
        <Link to="/" className="button block mt-5">
          Take me away
        </Link>
      </div>
    </div>
  );
};
