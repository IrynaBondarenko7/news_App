import { useEffect, useState } from "react";
import { MainArticle } from "../components/MainArticle";
import { PopularArticles } from "../components/PopularArticles";
import { getArticles } from "../api";
import { LatestArticles } from "../components/LatestArticles";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setArticles(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mx-auto">
        <p className="text-center text-sm text-secondAccent font-bold md:text-xl xl:text-4xl">
          Oops... <br />
          We use free Backend hosting and loading takes some time.
          <br />
          Please do not leave!
        </p>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <div className="flex flex-row gap-6 xl:gap-20">
        <MainArticle articles={articles} />
        <PopularArticles articles={articles} />
      </div>
      <LatestArticles />
      <Link
        to="/articles"
        className="text-blue-700 text-center mt-6 block button cursor-pointer"
      >
        View all articles
      </Link>
    </>
  );
};
