import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

//create variable restaurants

let restaurants;

export default class RestaurantsDAO {
  //initialize connection to database
  //get reference to restaurants database
  static async injectDB(conn) {
    if (restaurants) {
      //if restaurants is fiiled, return
      return;
    }
    try {
      //if not filled, connect to db in the environment variable restreviews_ns, and use the collection "restaurants"
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error("Unable to establish collection handle: ${e}");
    }
  }

  static async getRestaurants({
    //sorting
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    //empty query
    let query;
    if (filters) {
      if ("name" in filters) {
        //search for name anywhere in text
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        //search for cusine anywhere in database field "cuisine"
        query = { cuisine: { $eq: filters["cuisine"] } };
      }
      //search for zipcode anywhere in database field "address.zipcode"
      else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query); //find all restaurants that satisfies the query filter
    } catch (e) {
      console.error("Unable to issue find command, $(e)");
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    // limit the results using restaurants per page variable, and get page number using skip
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray(); //make restaurantsList an array
      const totalNumRestaurants = await restaurants.countDocuments(query); //get total number of restaurants
      return { restaurantsList, totalNumRestaurants }; //return restaurantslist and total number of restaurants
    } catch (e) {
      console.error(
        "Unable to conver cursor to array or problem counting documents, $(e)"
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
  // This method retrieves a restaurant by its ID along with its reviews.
  static async getRestaurantByID(id) {
    try {
      // Define an aggregation pipeline to match the provided restaurant ID.
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews", // Join with the 'reviews' collection
            let: {
              id: "$_id", // Define a variable 'id' with the restaurant's _id
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"], // Match reviews with the current restaurant's _id
                  },
                },
              },
              {
                $sort: {
                  date: -1, // Sort reviews by date in descending order
                },
              },
            ],
            as: "reviews", // Store the joined reviews in the 'reviews' field
          },
        },
        {
          $addFields: {
            reviews: "$reviews", // Add the 'reviews' field to the document
          },
        },
      ];

      // Execute the aggregation pipeline and return the result.
      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      // If an error occurs during the process, log the error and throw it.
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  // This method retrieves the list of available cuisines.
  static async getCuisines() {
    let cuisines = [];
    try {
      // Use the distinct method to fetch unique cuisine values from the 'restaurants' collection.
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      // If an error occurs during the process, log the error and return an empty array.
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
