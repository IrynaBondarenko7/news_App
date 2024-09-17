import { Link } from "react-router-dom";

export const PopularArticles = ({ articles }) => {
  const popularArticles = articles
    .filter((article) => article.votes > 3)
    .slice(1, 4);

  const defaultArticles = articles.slice(1, 4);

  return (
    <section>
      <h2>Most Popular</h2>
      {popularArticles.length > 0 && (
        <ul>
          {popularArticles.map((article) => {
            const url = `/articles/${article.article_id}`;
            return (
              <Link to={url} key={article.article_id}>
                <li className="w-44">
                  <img src={article.article_img_url} alt="article image" />
                  <h2 className="text-sm mt-2.5">{article.title}</h2>
                  <p>{article.votes}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
      {popularArticles.length === 0 && (
        <ul>
          {defaultArticles.map((article) => {
            const url = `/articles/${article.article_id}`;
            return (
              <Link to={url} key={article.article_id}>
                <li className="w-44">
                  <img src={article.article_img_url} alt="article image" />
                  <h2 className="text-sm mt-2.5">{article.title}</h2>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </section>
  );
};
