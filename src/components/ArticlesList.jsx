import { useEffect, useState } from "react";
import { getArticles } from "../api";

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
    <ul className="flex flex-col gap-6">
      {articles.map((article) => {
        return (
          <li
            key={article.article_id}
            className="flex gap-6 flex-col justify-center items-center"
          >
            <h2 className="text-sm mt-2.5">{article.title}</h2>
            <img
              src={article.article_img_url}
              alt="article image"
              className="w-[500px] block "
            />
            <p>Votes {article.votes}</p>
            <div className="flex gap-6">
              <p>Topic: {article.topic}</p>
              <p>Posted by: {article.author}</p>
            </div>
            <p>Comments</p>
            <ul>
              <li>Comment 1</li>
              <li>Comment 2</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
