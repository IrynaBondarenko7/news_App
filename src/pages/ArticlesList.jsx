import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { PiEyesFill } from "react-icons/pi";
import { FaRegComments } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { SelectSortQueries } from "../components/SelectSortQueries";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { BtnScrollTop } from "../components/BtnScrollTop";
import { getArticles } from "../api";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const { topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const sortSearch = searchParams.get("sort_by");
  const orderSearch = searchParams.get("order");

  useEffect(() => {
    getArticles(sortSearch || sortBy, topic, orderSearch || order)
      .then((response) => {
        setArticles(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        if (err.status === 404) {
          navigate("/articles/notfound");
        } else if (err.status === 400) {
          navigate("/articles/badrequest");
        }
      });
  }, [topic, sortBy, order, sortSearch, orderSearch, navigate]);

  if (isLoading) {
    return (
      <div className="w-full mx-auto my-20">
        <p className="text-center text-sm text-secondAccent font-bold md:text-xl xl:text-4xl">
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
    <>
      <SelectSortQueries
        navigate={navigate}
        setSortBy={setSortBy}
        setOrder={setOrder}
        orderSearch={orderSearch}
        sortSearch={sortSearch}
        setSearchParams={setSearchParams}
        location={location}
      />
      <ul className="flex flex-col gap-6 justify-center items-center">
        {articles.map((article) => {
          const url = `/articles/${article.article_id}`;
          const date = new Date(article.created_at).toLocaleDateString();
          const time = new Date(article.created_at).toLocaleTimeString();

          return (
            <li
              key={article.article_id}
              className="flex gap-8 flex-col justify-center items-center w-full xl:w-[700px] rounded-lg p-5 pb-6 border-2 shadow-2xl"
            >
              <Link to={url}>
                <h2 className="text-sm mt-2.5 underline text-secondAccent font-bold md:text-lg hover:text-main focus:text-main transition-all">
                  {article.title}
                </h2>
              </Link>
              <img
                src={article.article_img_url}
                alt="article image"
                className="w-full xl:w-[500px] block "
              />

              <div className="flex gap-6">
                <p>Topic: {article.topic}</p>
                <p>Posted by: {article.author}</p>
                <p>
                  {date} {time}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <Link to={url} className="flex items-center gap-2">
                  <p className="mt-2">Votes</p>
                  <div className="relative">
                    <p className="absolute top-[62%] left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {article.votes}
                    </p>
                    <SlLike size={40} fill="#508C9B" />
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <p>Comments </p>
                  <div className="relative">
                    <p className="absolute top-[42%] left-[37%] -translate-y-1/2 -translate-x-1/2">
                      {article.comment_count}
                    </p>
                    <FaRegComments size={50} fill="#508C9B" />
                  </div>
                </div>
              </div>
              <Link
                to={url}
                className="flex gap-3 items-center justify-center bg-white text-black px-3 py-2 rounded-lg button"
              >
                <PiEyesFill size={24} />
                <p>View comments</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <BtnScrollTop />
    </>
  );
};
