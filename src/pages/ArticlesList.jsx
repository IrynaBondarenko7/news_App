import { useEffect, useState } from "react";
import { getArticles } from "../api";
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { PiEyesFill } from "react-icons/pi";
import { SlLike } from "react-icons/sl";
import { SelectSortQueries } from "../components/SelectSortQueries";
// import Select from "react-select";

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
      });
  }, [topic, sortBy, order, sortSearch, orderSearch]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
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
      {/* <div>
        <p> Sort articles by</p>
        <Select
          name="sort"
          options={sortOptions}
          onChange={handleChange}
          isClearable={true}
        />
        <p> Sort articles in</p>
        <Select
          name="order"
          options={orderOptions}
          onChange={handleOrderChange}
          isClearable={true}
        />
      </div> */}
      <ul className="flex flex-col gap-6 justify-center items-center">
        {articles.map((article) => {
          const url = `/articles/${article.article_id}`;
          const date = new Date(article.created_at).toLocaleDateString();
          const time = new Date(article.created_at).toLocaleTimeString();

          return (
            <li
              key={article.article_id}
              className="flex gap-6 flex-col justify-center items-center w-full xl:w-[500px] bg-indigo-100 rounded-lg p-5"
            >
              <Link to={url}>
                <h2 className="text-sm mt-2.5 underline">{article.title}</h2>
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
              <div className="flex w-full xl:w-[500px] justify-between">
                <Link to={url} className="flex items-center gap-2">
                  <p className="mt-2">Votes</p>
                  <div className="relative">
                    <p className="absolute top-[62%] left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {article.votes}
                    </p>
                    <SlLike size={40} />
                  </div>
                </Link>

                <p>Comments {article.comment_count}</p>
              </div>
              <Link
                to={url}
                className="flex gap-3 items-center bg-white text-black px-3 py-2 rounded-lg"
              >
                <PiEyesFill size={24} />
                <p>View comments</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
