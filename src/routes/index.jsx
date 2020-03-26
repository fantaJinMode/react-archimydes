
import loginPage from "../views/loginPage/loginPage.jsx";
import React from "react";


const NotFound = () =>
    <div>
        <h3>Page Cannot be Found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>

export default NotFound

export const indexRoutes = [
  { path: "/login-page", name: "LoginPage", component: loginPage },
];

export const privateRoutes = [];
