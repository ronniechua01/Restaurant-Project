import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Login from "./components/login";
import RestaurantsList from "./components/restaurants-list";
import Restaurants from "./components/restaurants";

function App() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <a class="navbar-brand" href="/restaurants">
        RestauAnywhere
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link to ={"/restaurants"} className="nav-link">
              Restaurants <span class="sr-only">(current)</span>
            </Link>
          </li>
          <li class="nav-item">
            {user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout {user.name}
              </a>
            ) : (
              <Link to = {"/login"} className="nav-link">
                Login
              </Link>
            )
          }
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default App;
