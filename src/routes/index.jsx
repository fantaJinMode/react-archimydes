
import LoginPage from "../views/LoginPage/LoginPage.jsx";
import React from "react";


const NotFound = () =>
    <div>
        <h3>Page Cannot be Found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>

export default NotFound

export const indexRoutes = [
  { path: "/login-page", name: "LoginPage", component: LoginPage },
];

export const privateRoutes = [];
