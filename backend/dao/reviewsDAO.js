// Importing the MongoDB driver.
import mongodb from "mongodb";

//Convert a string to a mongodb object
const ObjectId = mongodb.ObjectID;

// Declaring a variable to hold the 'reviews' collection.
let reviews;

// This class serves as a DAO for handling review-related database operations.
export default class ReviewsDAO {

  // This method is used to inject the database connection into the DAO.
  static async injectDB(conn) {
    if (reviews) {
      return; // If the 'reviews' collection already exists, return early. If not it will be created automatically
    }
    try {
      // Establishing a connection to the 'reviews' collection.
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  // This method adds a new review to the database.
  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectId(restaurantId),
      };

      // Inserting the review document into the 'reviews' collection.
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // This method updates an existing review in the database.
  static async updateReview(reviewId, userId, text, date) {
    try {
      // Updating the review document using the provided parameters. It needs to be the same user who poster before they can edit
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { text: text, date: date } },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  // This method deletes a review from the database.
  static async deleteReview(reviewId, userId) {
    try {
      // Deleting the review document using the provided reviewId and userId. 
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}