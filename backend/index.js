
// Import the express app from server.js
import app from "./server.js";

// Import necessary packages
import mongodb from "mongodb";
import dotenv from "dotenv";
import restaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

// Load environment variables
dotenv.config();

// Access to the MongoDB client
const MongoClient = mongodb.MongoClient;

// Define the port number (fallback to port 8000 if not specified in environment variables)
const port = process.env.PORT || 8000;

// Connect to the database and start the server

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParser: true,
  })
  .catch((err) => {
    // If there's an error during the database connection, log the error and exit the process
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
      await restaurantsDAO.injectDB(client)
      await ReviewsDAO.injectDB(client)
      // The database connection is successful
      console.log("Connected to the database!")
      // Start the server once the database connection is established
      app.listen(port, () => {
        console.log(`Listening on port ${port}`)
      });
    }
  )
