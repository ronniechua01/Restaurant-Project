import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Login from "./components/login";
import RestaurantsList from "./components/restaurants-list";
import Restaurant from "./components/restaurants";

function App() {
  //create an initial value to the user variable
  //setUser is a function used to update the user variable
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    //when calling this function, the user variable will be update with the user passed in this function
    setUser(user);
  }

  async function logout() {
    //when logged out, the user variable will be null
    setUser(null);
  }

  return (
    <div>
      {/* Updated navbar with custom color scheme */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/restaurants" className="navbar-brand">
          RestauAnywhere
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              {/* Link to restaurants */}
              <Link to="/restaurants" className="nav-link">
                Restaurants <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              {/* If the user exists, then the value will be Logout, if the user does not exist, then it will be login */}
              {user ? (
                <a
                  onClick={logout}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout {user.name}
                </a>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* ROUTE SECTION */}
      <Switch>
        <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
        {/* use render to pass in props to the component */}
        <Route 
        path="/restaurants/:id/review" 
        render = {(props) => (
          <AddReview {...props} user={user} />
        )} />
        <Route path="/restaurants/:id" 
        render = {(props) => (
          <Restaurant {...props} user={user} />
        )} />
        <Route path="/login"
        render = {(props) => (
          <Login {...props} login={login} />
        )} />
      </Switch>
    </div>
  );
}

export default App;
