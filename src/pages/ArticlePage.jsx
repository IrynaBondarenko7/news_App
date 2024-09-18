import { useEffect, useState } from "react";
import {
  deleteCommentById,
  getArticleById,
  getCommentsByArticleId,
  postNewComment,
  voteArticleById,
} from "../api";
import { useParams } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Comments } from "../components/Comments";

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [votes, setVotes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
        setVotes(response.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((response) => {
        const sortedComments = response.toSorted(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setComments(sortedComments);
        setIsCommentsLoading(false);
      })
      .catch((err) => {
        setIsCommentsError(true);
        setIsCommentsLoading(false);
      });
  }, [article_id]);

  const showComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const onLikeArticleBtnClick = (id) => {
    const body = { inc_votes: 1 };
    voteArticleById(id, body)
      .then((response) => {
        setVotes((prevVotes) => {
          let newVotes = prevVotes;
          newVotes += 1;
          return newVotes;
        });
        toast.success("thanks for your vote");
      })
      .catch((err) => {
        toast.error("vote has not been added");
      });
  };

  const onSubmit = (data) => {
    const comment = {
      username: "jessjelly",
      body: newComment,
    };
    setNewComment("");
    postNewComment(article_id, comment)
      .then((response) => {
        setComments((prevComments) => {
          const commentsArr = [...prevComments];
          commentsArr.push(response);
          const sortedComments = commentsArr.toSorted(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          return sortedComments;
        });
        toast.success("comment added!");
      })
      .catch((err) => {
        toast.error("comment has not been added");
      });
  };

  watch((data) => {
    setNewComment(data.text);
  });

  const onDeleteCommentBtnClick = (id) => {
    deleteCommentById(id)
      .then((response) => {
        setComments((prevComments) => {
          const filteredComments = prevComments.filter(
            (comment) => comment.comment_id !== id
          );
          return filteredComments;
        });
        toast.success("comment deleted!");
      })
      .catch((err) => {
        toast.error("comment has not been deleted");
      });
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
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-center mb-4">{article.title}</h1>
            <p>Topic: {article.topic}</p>
            <p>Posted by: {article.author}</p>
          </div>
          <div className="flex gap-6 items-center mt-5">
            <p>Votes {votes}</p>
            <button
              type="button"
              aria-label="like"
              onClick={() => {
                onLikeArticleBtnClick(article.article_id);
              }}
            >
              <SlLike size={24} />
            </button>
          </div>
        </div>
      </div>

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
      {isCommentsVisible && (
        <Comments
          comments={comments}
          isLoading={isCommentsLoading}
          isError={isCommentsError}
          deleteComment={onDeleteCommentBtnClick}
        />
      )}
      <p className="mt-5">Leave comment</p>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <p>User name: jessjelly</p>
        <textarea
          {...register("text", { required: true, maxLength: 200 })}
          value={newComment}
          className="border-2 border-black w-full"
        />
        {errors?.text?.type === "required" && <p>This field is required</p>}
        {errors?.text?.type === "maxLength" && (
          <p>You have exceeded the maximum number of characters</p>
        )}

        <button type="submit">Submit</button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false} />
    </section>
  );
};
