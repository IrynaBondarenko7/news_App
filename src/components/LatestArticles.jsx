import { Link } from "react-router-dom";

export const LatestArticles = ({ articles }) => {
  const latestArticles = articles
    .toSorted((a, b) => a.created_at - b.created_at)
    .slice(1, 5);

  return (
    <div>
      <h2>The Latest</h2>
      <ul className="flex flex-col gap-6">
        {latestArticles.map((article) => {
          const url = `/articles/${article.article_id}`;
          return (
            <Link to={url} key={article.article_id}>
              <li className="flex gap-6">
                <img
                  src={article.article_img_url}
                  alt="article image"
                  className="w-48"
                />
                <div className="flex flex-col">
                  <h2 className="text-sm mt-2.5">{article.title}</h2>
                  <div className="flex flex-col">
                    <p>Topic: {article.topic}</p>
                    <p>Posted by: {article.author}</p>
                    <p>Comments to the article: {article.comment_count}</p>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
