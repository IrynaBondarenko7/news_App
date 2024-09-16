import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://news-api-4de7.onrender.com/api",
});

export const getArticles = () => {
  return apiInstance
    .get("/articles")
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      return err;
    });
};

export const geArticleById = (article_id) => {
  return apiInstance
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      return err;
    });
};
