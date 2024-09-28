import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://news-api-4de7.onrender.com/api",
});

export const getArticles = (sort_by, topic, order) => {
  return apiInstance
    .get("/articles", {
      params: {
        sort_by: sort_by,
        topic: topic,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (article_id) => {
  return apiInstance.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return apiInstance
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const voteArticleById = (article_id, body) => {
  return apiInstance.patch(`/articles/${article_id}`, body).then(({ data }) => {
    return data;
  });
};

export const postNewComment = (article_id, body) => {
  return apiInstance
    .post(`/articles/${article_id}/comments`, body)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteCommentById = (comment_id) => {
  return apiInstance.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return apiInstance.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getUsers = () => {
  return apiInstance.get("/users").then(({ data }) => {
    return data.users;
  });
};
