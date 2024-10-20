import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { UserContext } from "../components/UserContext";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";

export const Comments = ({ comments, isLoading, isError, deleteComment }) => {
  const { user } = useContext(UserContext);
  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
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
                        deleteComment(comment.comment_id);
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
    </>
  );
};
