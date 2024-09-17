import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import { Comments } from "../components/Comments";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

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

  const showComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <ul className="flex flex-col gap-6 justify-center items-center">
      {articles.map((article) => {
        const url = `/articles/${article.article_id}`;

        return (
          <li
            key={article.article_id}
            className="flex gap-6 flex-col justify-center items-center w-[500px]"
          >
            <Link to={url}>
              <h2 className="text-sm mt-2.5">{article.title}</h2>
            </Link>
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
            <div className="flex justify-between w-[500px]">
              <p>Comments {article.comment_count}</p>
              {article.comment_count > 0 && (
                <button
                  type="button"
                  onClick={showComments}
                  className="text-blue-600"
                >
                  {!isCommentsVisible && "Show all comments"}
                  {isCommentsVisible && "Hide comments"}
                </button>
              )}
            </div>
            {isCommentsVisible && <Comments article_id={article.article_id} />}
            <p>Leave comment</p>
            <textarea
              name=""
              id=""
              className="border-2 border-black w-[500px]"
            ></textarea>
          </li>
        );
      })}
    </ul>
  );
};