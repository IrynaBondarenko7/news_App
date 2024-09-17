import { Link } from "react-router-dom";

export const MainArticle = ({ articles }) => {
  const randomArticleIndex = Math.floor(Math.random() * articles.length);
  const mainArticle = articles[randomArticleIndex];
  const url = `/articles/${articles[randomArticleIndex].article_id}`;

  return (
    <Link to={url}>
      <section className="w-[700px] mb-6">
        <img src={mainArticle.article_img_url} alt="article img" />
        <h1 className="text-5xl mt-5">{mainArticle.title}</h1>
      </section>
    </Link>
  );
};
