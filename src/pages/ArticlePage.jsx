import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  const showComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <section>
      <div className="flex gap-6 flex-col md:flex-row">
        <img
          src={article.article_img_url}
          alt="article img"
          className="f-full md:w-[400px]"
        />
        <div>
          <h1 className="text-center mb-4">{article.title}</h1>
          <p>Topic: {article.topic}</p>
          <p>Posted by: {article.author}</p>
        </div>
      </div>
      <p>Votes {article.votes}</p>
      <div className="flex justify-between mb-4">
        <p>
          Comments <span>{article.comment_count}</span>
        </p>
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
      <p className="mt-5">Leave comment</p>
      <textarea
        name=""
        id=""
        className="border-2 border-black w-full"
      ></textarea>
    </section>
  );
};
