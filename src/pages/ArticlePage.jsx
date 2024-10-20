import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import toast, { Toaster } from "react-hot-toast";
import { Comments } from "../components/Comments";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { UserContext } from "../components/UserContext";
import { getArticleById, voteArticleById } from "../api";

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const date = new Date(article.created_at).toLocaleDateString();
  const time = new Date(article.created_at).toLocaleTimeString();

  useEffect(() => {
    localStorage.setItem(
      "voted",
      JSON.stringify({
        article_id: article_id,
        voted: false,
      })
    );
    getArticleById(article_id)
      .then((response) => {
        setArticle(response);
        setVotes(response.votes);
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
    <section>
      <Link
        to="/articles"
        className="left-5 flex gap-2 items-center mb-4 text-secondAccent hover:text-main focus:text-main transition-all"
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
      <Comments article_id={article_id} />
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};
