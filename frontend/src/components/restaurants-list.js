import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  // State variables to store restaurant data and search criteria
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  // Fetch initial restaurant data and cuisines when the component mounts
  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  // Event handler for changing the "Search by name" input
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  // Event handler for changing the "Search by zip" input
  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  // Event handler for changing the selected cuisine from the dropdown
  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  // Function to retrieve all restaurants
  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Function to retrieve the list of cuisines
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Function to refresh the restaurant list
  const refreshList = () => {
    retrieveRestaurants();
  };

  // Function to search for restaurants by name
  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Function to search for restaurants by name criteria
  const findByName = () => {
    find(searchName, "name");
  };

  // Function to search for restaurants by zip code criteria
  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  // Function to search for restaurants by cuisine criteria
  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        {/* Input for searching by name */}
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        {/* Input for searching by zip code */}
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        {/* Dropdown for selecting cuisine */}
        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine} key={cuisine}>
                  {cuisine.substr(0, 20)}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Display restaurant cards */}
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={restaurant._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    {/* Link to view restaurant reviews */}
                    <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    {/* Link to view restaurant on Google Maps */}
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
