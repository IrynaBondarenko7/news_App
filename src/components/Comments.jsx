import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { UserContext } from "../components/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import {
  getCommentsByArticleId,
  postNewComment,
  deleteCommentById,
} from "../api";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response);
        setIsCommentsLoading(false);
      })
      .catch((err) => {
        setIsCommentsError(true);
        setIsCommentsLoading(false);
      });
  }, [article_id]);

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

  if (isCommentsLoading) {
    return <p>Loading....</p>;
  }

  if (isCommentsError) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {comments.length === 0 ? (
        <div className="w-[80%] mx-auto ">
          <p className="text-center text-secondAccent font-bold">
            Your comment may be the first
          </p>
          <DotLottieReact src="/comment.json" loop autoplay />
        </div>
      ) : (
        <Swiper
          direction={"vertical"}
          slidesPerView={"auto"}
          freeMode={true}
          scrollbar={true}
          mousewheel={true}
          modules={[FreeMode, Scrollbar, Mousewheel]}
          className="mySwiper h-[300px] w-full shadow-md border-2 rounded-lg p-2"
        >
          {comments.map((comment) => {
            const date = new Date(comment.created_at).toLocaleDateString();
            const time = new Date(comment.created_at).toLocaleTimeString();
            return (
              <SwiperSlide
                key={comment.comment_id}
                className="mb-6 h-auto w-[90%] mx-auto"
              >
                <div className="flex justify-between mb-6">
                  <h3 className="font-bold">{comment.author}</h3>
                  <p className="text-slate-500">
                    {date} {time}
                  </p>
                </div>
                <p>{comment.body}</p>
                <div className="flex justify-between">
                  <p>votes: {comment.votes}</p>
                  {comment.author === user && (
                    <button
                      onClick={() => {
                        onDeleteCommentBtnClick(comment.comment_id);
                      }}
                      aria-label="delete comment"
                    >
                      <MdDeleteForever size={24} />
                    </button>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <p className="mt-5 text-main font-bold">Leave comment</p>
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
          className="border-2 border-main w-full mb-6 p-2"
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
    </>
  );
};
