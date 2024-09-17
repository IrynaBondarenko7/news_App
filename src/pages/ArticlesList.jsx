import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import { PiEyesFill } from "react-icons/pi";
import { SlLike } from "react-icons/sl";

export const ArticlesList = () => {
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
    <ul className="flex flex-col gap-6 justify-center items-center">
      {articles.map((article) => {
        const url = `/articles/${article.article_id}`;
        const date = new Date(article.created_at).toLocaleDateString();
        const time = new Date(article.created_at).toLocaleTimeString();

        return (
          <li
            key={article.article_id}
            className="flex gap-6 flex-col justify-center items-center w-full xl:w-[500px] bg-indigo-100 rounded-lg p-5"
          >
            <Link to={url}>
              <h2 className="text-sm mt-2.5 underline">{article.title}</h2>
            </Link>
            <img
              src={article.article_img_url}
              alt="article image"
              className="w-full xl:w-[500px] block "
            />

            <div className="flex gap-6">
              <p>Topic: {article.topic}</p>
              <p>Posted by: {article.author}</p>
              <p>
                {date} {time}
              </p>
            </div>
            <div className="flex w-full xl:w-[500px] justify-between">
              <Link to={url} className="flex items-center gap-2">
                <p className="mt-2">Votes</p>
                <div className="relative">
                  <p className="absolute top-[62%] left-1/2 -translate-y-1/2 -translate-x-1/2">
                    {article.votes}
                  </p>
                  <SlLike size={40} />
                </div>
              </Link>

              <p>Comments {article.comment_count}</p>
            </div>
            <Link
              to={url}
              className="flex gap-3 items-center bg-white text-black px-3 py-2 rounded-lg"
            >
              <PiEyesFill size={24} />
              <p>View comments</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
