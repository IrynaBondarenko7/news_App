import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ArticlesList } from "../pages/ArticlesList";
import { ArticlePage } from "../pages/ArticlePage";
import { NotFoundArticle } from "../pages/NotFoundArticle";
import { NotFoundPage } from "../pages/NotFoundPage";
import { BadRequest } from "../pages/BadRequest";
import { SignInPage } from "../pages/SingInPage";
import { SignUpPage } from "../pages/SignUpPage";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/articles" element={<ArticlesList />} />
      <Route path="/articles/:article_id" element={<ArticlePage />} />
      <Route path="articles/topics/:topic" element={<ArticlesList />} />
      <Route path="articles/notfound" element={<NotFoundArticle />} />
      <Route path="articles/badrequest" element={<BadRequest />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
