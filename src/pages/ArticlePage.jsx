import { useEffect, useState, useContext } from "react";
import {
  deleteCommentById,
  getArticleById,
  getCommentsByArticleId,
  postNewComment,
  voteArticleById,
} from "../api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Comments } from "../components/Comments";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { UserContext } from "../components/UserContext";

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isCommentsError, setIsCommentsError] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const date = new Date(article.created_at).toLocaleDateString();
  const time = new Date(article.created_at).toLocaleTimeString();

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
    localStorage.setItem(
      "voted",
      JSON.stringify({
        article_id: article_id,
        voted: false,
      })
    );
    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response);
        setIsCommentsLoading(false);
      })
      .catch((err) => {
        setIsCommentsError(true);
        setIsCommentsLoading(false);
        if (err.status === 404) {
          navigate("/articles/notfound");
        } else if (err.status === 400) {
          navigate("/articles/badrequest");
        }
      });
  }, [article_id, navigate]);

  const onLikeArticleBtnClick = (id) => {
    const votedArticle = JSON.parse(localStorage.getItem("voted"));
    if (user) {
      if (Number(votedArticle?.article_id) === id && !votedArticle.voted) {
        const body = { inc_votes: 1 };
        voteArticleById(id, body)
          .then((response) => {
            setVotes((prevVotes) => {
              let newVotes = prevVotes;
              newVotes += 1;
              return newVotes;
            });
            toast.success("thanks for your vote");
            localStorage.setItem(
              "voted",
              JSON.stringify({
                article_id: article_id,
                voted: true,
              })
            );
          })
          .catch((err) => {
            toast.error("vote has not been added");
          });
      } else {
        const body = { inc_votes: -1 };
        voteArticleById(id, body)
          .then((response) => {
            setVotes((prevVotes) => {
              let newVotes = prevVotes;
              newVotes -= 1;
              return newVotes;
            });
            toast.success("you removed your vote for this article");
            localStorage.setItem(
              "voted",
              JSON.stringify({
                article_id: article_id,
                voted: false,
              })
            );
          })
          .catch((err) => {
            toast.error("vote has not been removed");
          });
      }
    } else {
      toast.error("Please sign in before vote");
    }
  };

  const onSubmit = (data) => {
    if (user) {
      const comment = {
        username: user,
        body: newComment,
      };
      setNewComment("");
      postNewComment(article_id, comment)
        .then((response) => {
          setComments((prevComments) => {
            const commentsArr = [...prevComments];
            commentsArr.unshift(response);
            return commentsArr;
          });
          toast.success("comment added!");
        })
        .catch((err) => {
          toast.error("comment has not been added");
        });
    } else {
      toast.error("Please sign in before leave comment");
    }
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
    return (
      <div className="w-full mx-auto my-20">
        <p className="text-center text-sm text-[#134B70] font-bold md:text-xl xl:text-4xl">
          Loading...
        </p>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <Error />;
  }

  return (
    <section>
      <Link
        to="/articles"
        className="left-5 flex gap-2 items-center mb-4 text-[#134B70] hover:text-[#508C9B] focus:text-[#508C9B] transition-all"
      >
        <FaLongArrowAltLeft />
        <p>Back to all articles</p>
      </Link>
      <div className="flex gap-6 flex-col md:flex-row">
        <img
          src={article.article_img_url}
          alt="article img"
          className="f-full md:w-[400px]"
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-center mb-4 font-bold">{article.title}</h1>
            <p>Topic: {article.topic}</p>
            <p>Posted by: {article.author}</p>
            <p className="text-slate-500">
              {date} {time}
            </p>
          </div>
          <div className="flex gap-6 items-center mt-5">
            <p className="mt-1">Votes {votes}</p>
            <button
              type="button"
              aria-label="like"
              onClick={() => {
                onLikeArticleBtnClick(article.article_id);
              }}
            >
              <SlLike
                size={24}
                fill="#508C9B"
                className="hover:scale-110 focus:scale-110 transition-all"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between my-4">
        <p>
          Comments <span>{article.comment_count}</span>
        </p>
      </div>
      <Comments
        comments={comments}
        isLoading={isCommentsLoading}
        isError={isCommentsError}
        deleteComment={onDeleteCommentBtnClick}
      />

      <p className="mt-5 text-[#508C9B] font-bold">Leave comment</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
        {user ? (
          <p className="my-2">
            <span className="font-bold">UserName:</span> {user}
          </p>
        ) : (
          "Please sign in before leave comment"
        )}

        <textarea
          {...register("text", { required: true, maxLength: 200 })}
          value={newComment}
          className="border-2 border-[#508C9B] w-full mb-6"
        />
        {errors?.text?.type === "required" && (
          <p className="absolute text-red-700 bottom-11">
            This field is required
          </p>
        )}
        {errors?.text?.type === "maxLength" && (
          <p className="absolute text-red-700 bottom-11">
            You have exceeded the maximum number of characters
          </p>
        )}

        <button type="submit" className="button mx-auto block">
          Submit
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};
