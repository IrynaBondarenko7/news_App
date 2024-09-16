import { useEffect, useState } from "react";
import { MainArticle } from "../components/MainArticle";
import { PopularArticles } from "../components/PopularArticles";
import { getArticles } from "../api";
import { LatestArticles } from "../components/LatestArticles";
import { Link } from "react-router-dom";

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
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <div className="flex flex-row gap-6">
        <MainArticle articles={articles} />
        <PopularArticles articles={articles} />
      </div>
      <LatestArticles />
      <Link to="/articles" className="text-blue-700 text-center mt-6 block">
        View all articles
      </Link>
    </>
  );
};
