import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import { ShowCommentsBtn } from "../components/ShowCommentsBtn";

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

        return (
          <li
            key={article.article_id}
            className="flex gap-6 flex-col justify-center items-center w-full xl:w-[500px]"
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
            </div>
            <div className="flex w-full xl:w-[500px] justify-between">
              <p>Votes {article.votes}</p>
              <p>Comments {article.comment_count}</p>
            </div>
            {article.comment_count > 0 && (
              <ShowCommentsBtn article_id={article.article_id} />
            )}
            <p>Leave comment</p>
            <textarea
              name=""
              id=""
              className="border-2 border-black w-full xl:w-[500px]"
            ></textarea>
          </li>
        );
      })}
    </ul>
  );
};
