import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://news-api-4de7.onrender.com/api",
});

export const getArticles = (sort_by) => {
  return apiInstance
    .get("/articles", {
      params: {
        sort_by: sort_by,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticleById = (article_id) => {
  return apiInstance
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      return err;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return apiInstance
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      return err;
    });
};

export const voteArticleById = (article_id, body) => {
  return apiInstance
    .patch(`/articles/${article_id}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
