import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./components/LandingPage.js";
import PageSurround from "./components/PageSurround.js";
import LoginPanel from "./components/LoginPanel.js";
import CreateAccountPanel from "./components/CreateAccountPanel.js";
import ShopDeck from "./components/ShopDeck.js";

import { BrowserRouter as Router, Route } from "react-router-dom";

const element = document.createElement("div");
element.id = "root";
document.body.append(element);

ReactDOM.render(
  <Router>
    <PageSurround>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/login">
        <LoginPanel />
      </Route>
      <Route path="/createAccount">
        <CreateAccountPanel />
      </Route>
      <Route path="/shop">
        <ShopDeck />
      </Route>
    </PageSurround>
  </Router>,
  document.getElementById("root")
);
