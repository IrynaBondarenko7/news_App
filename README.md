# News App

A Vite + React-based News Application that provides users with the latest news, popular articles, and the ability to explore detailed information on each news article. Users can also leave comments, vote on articles, and sort articles based on various criteria.

## Live Demo

Check out the deployed version of the News App here: [News App Live](https://iryna-bd-trend-news.netlify.app/)

## General Information

The News App is a simple, user-friendly platform for exploring the latest and most popular news articles. The application provides a Home page with highlights of the main news article, popular articles, and the most recent news. Users can also view all articles and filter them based on topic, date, number of comments, and votes. Additionally, the app includes error handling for non-existent articles or pages, ensuring smooth navigation.

## Features:

- **Home Page:** Displays the main news article, a list of the most popular news, and the most recent news. A link to view all articles is also available.
- **All Articles Page:** Users can sort articles by topic, date, number of comments, or votes. Sorting can be done in ascending or descending order.
- **Article Page:** View individual articles, vote for the article, read comments, and leave your own comment.
- **Error Handling:** If a user tries to access a non-existent article or page, they are redirected to a "Not Found" page. Bad requests are redirected to an appropriate "Bad Request" page.

## Backend

The application is powered by a backend API that provides news data and handles voting and comments. You can find the backend repository here: [News API](https://github.com/IrynaBondarenko7/news_API)

## Project Structure

```
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   └── _redirects
├── README.md
├── src
│   ├── api.js
│   ├── App.jsx
│   ├── assets
│   ├── components
│   ├── index.css
│   ├── main.jsx
│   └── pages
├── tailwind.config.js
└── vite.config.js
```

## Requirements

**Node.js:** Minimum version required is **v22.4.1**. You can check your current Node version by running:

```
node --version
```

## Installation and Setup

Follow the steps below to run the project locally:

1. Clone the repository:

```
git clone https://github.com/IrynaBondarenko7/news_App.git
```

2. Navigate into the project directory:

```
cd news_App
```

3. Install dependencies:

```
npm install
```

4. Run the application locally:

```
npm run dev
```

5. View the app in your browser: Open your browser and go to

```
http://localhost:5173/
```

## Technologies Used

- **Vite:** Fast development environment for modern web apps.
- **React:** A JavaScript library for building user interfaces.
- **React Router:** Handles client-side routing and navigation.
- **Axios:** For making API requests to the backend.
- **Tailwind CSS:** For styling components.

## Additional Information

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
