import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api";

export const LatestArticles = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles("created_at")
      .then((response) => {
        setIsLoading(false);
        setLatestArticles(response.slice(0, 4));
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
    <section className="my-3">
      <h2 className="text-lg border-b-2 border-blue-900 w-[85px] mb-5">
        The Latest
      </h2>
      <ul className="flex flex-col gap-6 text-sm w-full">
        {latestArticles.map((article) => {
          const url = `/articles/${article.article_id}`;
          return (
            <Link to={url} key={article.article_id}>
              <li className="flex gap-3 md:gap-6 flex-col md:flex-row items-center md:items-start">
                <img
                  src={article.article_img_url}
                  alt="article image"
                  className="w-full md:w-48"
                />
                <div className="flex flex-col items-start w-full">
                  <h2 className="font-bold md:mt-2.5 mx-auto text-center md:text-left md:mx-0">
                    {article.title}
                  </h2>
                  <p className="mt-2">Topic: {article.topic}</p>
                  <p>Posted by: {article.author}</p>
                  <p>Comments to the article: {article.comment_count}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
