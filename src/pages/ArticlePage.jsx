import { useEffect, useState } from "react";
import { geArticleById } from "../api";
import { useParams } from "react-router-dom";

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    geArticleById(article_id).then((response) => {
      setArticle(response);
    });
  }, [article_id]);
  return (
    <div>
      <div className="flex gap-6">
        <img
          src={article.article_img_url}
          alt="article img"
          className="w-[400px]"
        />
        <div>
          <h1 className="text-center">{article.title}</h1>
          <p>Topic: {article.topic}</p>
          <p>Posted by: {article.author}</p>
        </div>
      </div>
      <p>Votes {article.votes}</p>
      <p>Comments</p>
      <ul>
        <li>Comment 1</li>
        <li>Comment 2</li>
      </ul>
      <p>Leave comment</p>
    </div>
  );
};
