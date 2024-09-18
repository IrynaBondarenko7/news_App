import { MdDeleteForever } from "react-icons/md";

export const Comments = ({ comments, isLoading, isError, deleteComment }) => {
  if (isLoading) {
    return <p>LOADINGGGGGGGGGGGGGGGGGG....</p>;
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
            <div className="flex justify-between">
              <p>votes: {comment.votes}</p>
              <button
                onClick={() => {
                  deleteComment(comment.comment_id);
                }}
                aria-label="delete comment"
              >
                <MdDeleteForever size={24} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
