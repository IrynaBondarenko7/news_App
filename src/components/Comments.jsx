import { MdDeleteForever } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";

export const Comments = ({ comments, isLoading, isError, deleteComment }) => {
  if (isLoading) {
    return <p>LOADINGGGGGGGGGGGGGGGGGG....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={true}
      scrollbar={true}
      mousewheel={true}
      modules={[FreeMode, Scrollbar, Mousewheel]}
      className="mySwiper h-[300px] w-full border-[#508C9B] border-2 rounded-lg p-2"
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
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
