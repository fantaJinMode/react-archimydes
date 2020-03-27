
import loginPage from "../views/loginPage/loginPage.jsx";
import createUserStories from "../views/userStories/createUserStories.jsx";
import userStoriesList from "../views/userStories/userStoriesList.jsx";
import React from "react";
import UserStoriesDetails from "../views/userStories/UserStoriesDetails.jsx";


const NotFound = () =>
    <div>
        <h3>Page Cannot be Found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>

export default NotFound

export const indexRoutes = [
  { path: "/login-page", name: "LoginPage", component: loginPage },
  { path: "/", name: "LoginPage", component: loginPage },
  { path: "/user-story/create", name: "CreateUserStories", component: createUserStories },
  { path: "/user-story/details/:id", name: "UserStoriesLDetails", component: UserStoriesDetails },
  { path: "/user-story", name: "UserStoriesList", component: userStoriesList },
];

export const privateRoutes = [];
