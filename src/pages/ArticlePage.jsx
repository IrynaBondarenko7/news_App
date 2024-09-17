import { useEffect, useState } from "react";
import { getArticleById, getCommentsByArticleId } from "../api";
import { useParams } from "react-router-dom";

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);
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

    getCommentsByArticleId(article_id).then((response) => {
      setComments(response);
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
    <div>
      <div className="flex gap-6">
        <img
          src={article.article_img_url}
          alt="article img"
          className="w-[400px]"
        />
        <div>
          <h1 className="text-center">{article.title}</h1>
          <p>Topic: {article.topic}</p>
          <p>Posted by: {article.author}</p>
        </div>
      </div>
      <p>Votes {article.votes}</p>
      <p>
        Comments <span>{comments.length}</span>
      </p>
      {comments.length > 0 && (
        <button type="button" onClick={showComments} className="text-blue-600">
          {!isCommentsVisible && "Show all comments"}
          {isCommentsVisible && "Hide comments"}
        </button>
      )}
      {isCommentsVisible && (
        <ul>
          {comments.map((comment) => {
            const date = new Date(comment.created_at).toLocaleDateString();
            const time = new Date(comment.created_at).toLocaleTimeString();
            return (
              <li key={comment.comment_id}>
                <h3>{comment.author}</h3>
                <p>{comment.body}</p>
                <p>{date}</p>
                <p>{time}</p>
                <p>{comment.votes}</p>
              </li>
            );
          })}
        </ul>
      )}
      <p>Leave comment</p>
      <textarea name="" id="" className="border-2 border-black"></textarea>
    </div>
  );
};
