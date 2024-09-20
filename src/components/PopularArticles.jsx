import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export const PopularArticles = ({ articles }) => {
  const popularArticles = articles.filter((article) => article.votes > 3);

  const defaultArticles = articles.slice(1, 10);

  return (
    <section className="hidden md:block">
      <h2 className="text-lg border-b-2 border-blue-900 w-[110px] mb-5">
        Most Popular
      </h2>
      {popularArticles.length > 0 && (
        <Swiper
          direction={"vertical"}
          loop={true}
          className="mySwiper h-[400px]"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={10}
        >
          {popularArticles.map((article) => {
            const url = `/articles/${article.article_id}`;
            return (
              <SwiperSlide key={article.article_id} className="h-auto w-48">
                <Link to={url}>
                  <img src={article.article_img_url} alt="article image" />
                  <h2 className="text-sm mt-2.5 font-bold">{article.title}</h2>
                  <p className="text-sm">Votes: {article.votes}</p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {popularArticles.length === 0 && (
        <Swiper
          direction={"vertical"}
          loop={true}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
        >
          {defaultArticles.map((article) => {
            const url = `/articles/${article.article_id}`;
            return (
              <SwiperSlide key={article.article_id} className="h-[180px]">
                <Link to={url}>
                  <li className="w-44">
                    <img src={article.article_img_url} alt="article image" />
                    <h2 className="text-sm mt-2.5 font-bold">
                      {article.title}
                    </h2>
                  </li>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};
