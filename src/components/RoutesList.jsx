import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ArticlesList } from "./ArticlesList";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<ArticlesList />} />
    </Routes>
  );
};
