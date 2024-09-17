import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../api";

export const Comments = ({ comments, isLoading, isError }) => {
  // const [comments, setComments] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   getCommentsByArticleId(article_id)
  //     .then((response) => {
  //       setComments(response);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsError(true);
  //       setIsLoading(false);
  //     });
  // });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <ul>
      {comments.map((comment) => {
        const date = new Date(comment.created_at).toLocaleDateString();
        const time = new Date(comment.created_at).toLocaleTimeString();
        return (
          <li key={comment.comment_id} className="mb-6">
            <div className="flex justify-between mb-6">
              <h3>{comment.author}</h3>
              <p>
                {date} {time}
              </p>
            </div>
            <p>{comment.body}</p>
            <p>votes: {comment.votes}</p>
          </li>
        );
      })}
    </ul>
  );
};
