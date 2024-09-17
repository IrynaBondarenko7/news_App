import { useState } from "react";
import { Comments } from "../components/Comments";
export const ShowCommentsBtn = ({ article_id }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const showComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <>
      <button type="button" onClick={showComments} className="text-blue-600">
        {!isCommentsVisible && "Show all comments"}
        {isCommentsVisible && "Hide comments"}
      </button>
      {isCommentsVisible && <Comments article_id={article_id} />}
    </>
  );
};
