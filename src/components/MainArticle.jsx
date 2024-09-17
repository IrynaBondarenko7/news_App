import { Link } from "react-router-dom";

export const MainArticle = ({ articles }) => {
  const randomArticleIndex = Math.floor(Math.random() * articles.length);
  const mainArticle = articles[randomArticleIndex];
  const url = `/articles/${articles[randomArticleIndex].article_id}`;

  return (
    <Link to={url}>
      <section className="w-full md:w-[500px] xl:w-[700px] mb-2 xl:mb-6 md:mt-6 font-bold">
        <img src={mainArticle.article_img_url} alt="article img" />
        <h1 className="text-xl md:text-3xl xl:text-5xl mt-2 md:mt-8">
          {mainArticle.title}
        </h1>
      </section>
    </Link>
  );
};
