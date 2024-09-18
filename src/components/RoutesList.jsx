import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ArticlesList } from "../pages/ArticlesList";
import { ArticlePage } from "../pages/ArticlePage";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:article_id" element={<ArticlePage />} />
      <Route path="articles/topics/:topic" element={<ArticlesList />} />
    </Routes>
  );
};
