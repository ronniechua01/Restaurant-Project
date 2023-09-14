import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Styles from "./App.css"

function App() {
  //create an initial value to the user variable
  //setUser is a function used to update the user variable
  const [user, setUser] = React.useState(null)

  async function login(user = null){
    //when calling this function, the user variable will be update with the user passed in this function
    setUser (user)
  }

  async function logout(){
    //when logged out, the user variable will be null
    setUser (null)
  }

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand navbar-dark bg-dark" class={Styles.Name}>
          <a href="/restaurants" className="navbar-brand">
            RestauViews
          </a>
          <div className="navbar-nav mr-auto">
            {/* Restaurants link */}
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              {/* Show Logout if user is logged in, otherwise show Login link */}
              {user ? (
                <a onClick={logout} className="nav-link" style={{ cursor: "pointer" }}>
                  Logout {user.name}
                </a>
              ) : (
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </div>
        </nav>

        {/* Main content */}
        <div className="container mt-3">
          {/* Routing */}
          <Switch>
            {/* Route for the list of restaurants */}
            <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
            {/* Route for adding a review to a restaurant */}
            <Route
              path="/restaurants/:id/review"
              //use render instead of component to add props
              render={(props) => (
                <AddReview {...props} user={user} />
              )}
            />
            {/* Route for displaying a restaurant */}
            <Route
              path="/restaurants/:id"
              render={(props) => (
                <Restaurant {...props} user={user} />
              )}
            />
            {/* Route for user login */}
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} login={login} />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
