import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  //api get restaurants method
  //when this api is called, there will be a query string
  //query string can specify certain parameters
  static async apiGetRestaurants(req, res, next) {
    // set restaurantsPerPage variable to the value passed in the url
    // check first if it exist, if yes, then convert it to int, if not it equals 20
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    //call getRestaurants

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });
    //create response to respond when api url is called
    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };

    //send a json type response
    res.json(response);
  }
  // This method retrieves a restaurant by its ID.
  static async apiGetRestaurantById(req, res, next) {
    try {
      // Extract the restaurant ID from the request parameters.
      let id = req.params.id || {};

      // Call the getRestaurantByID method from RestaurantsDAO to fetch the restaurant by its ID.
      let restaurant = await RestaurantsDAO.getRestaurantByID(id);

      // Check if the restaurant is not found.
      if (!restaurant) {
        // If the restaurant is not found, respond with a 404 status and an error message.
        res.status(404).json({ error: "Not found" });
        return;
      }

      // Respond with the retrieved restaurant information.
      res.json(restaurant);
    } catch (e) {
      // If an error occurs during the process, log the error and respond with a 500 status and the error message.
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // This method retrieves the list of available cuisines.
  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      // Call the getCuisines method from RestaurantsDAO to fetch the list of available cuisines.
      let cuisines = await RestaurantsDAO.getCuisines();

      // Respond with the list of cuisines.
      res.json(cuisines);
    } catch (e) {
      // If an error occurs during the process, log the error and respond with a 500 status and the error message.
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
