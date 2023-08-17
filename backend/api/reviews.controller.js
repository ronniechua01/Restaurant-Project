import ReviewsDAO from "../dao/reviewsDAO.js"

// This is a class that defines methods for handling reviews related operations.
export default class ReviewsController {

    // This method handles the creation of a new review.
    static async apiPostReview(req, res, next){
        try {
            // Extracting relevant data from the request body. Such as restaurant ID, the review text itself, user info, and date posted
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();

            // Adding the review using a DAO (Data Access Object) method.
            const reviewResponse = await ReviewsDAO.addReview (
                restaurantId,
                userInfo,
                review,
                date
            );

            // Sending a success response.
            req.json({status:"success"});
        } catch(e) {
            // Handling errors and sending an error response if something goes wrong.
            req.status(500).json({error: e.message});
        }
    }

    // This method handles updating an existing review.
    static async apiUpdateReview(req, res, next){
        try {
            // Extracting relevant data from the request body. Such as restaurant id, new updated review text, new updated date.
            const restaurantId = req.body.restaurant_id;
            const review = req.body.text;
            const date = new Date();

            // Updating the review using a DAO method.
            const reviewResponse = await ReviewsDAO.apiUpdateReview (
                restaurantId,
                req.body.user_id,
                text,
                date
            );

            var {error} = reviewResponse;
            if (error) {
                // Sending an error response if there's an error during the update.
                res.status(400).json({error});
            }

            // Checking if the review was successfully modified, otherwise throwing an error.
            if (reviewResponse.modifiedCount === 0){
                throw new Error(
                    "Unable to update this review, user may not be the original poster"
                );
            }

            // Sending a success response.
            req.json({status:"success"});
        } catch(e) {
            // Handling errors and sending an error response if something goes wrong.
            req.status(500).json({error: e.message});
        }
    }

    // This method handles deleting a review.
    static async apiDeleteReview(req, res, next) {
        try {
            // Extracting the review and user IDs from the request.
            const reviewId = req.query.id;
            const userId = req.body.user_id;
            console.log(reviewId);

            // Deleting the review using a DAO method.
            const reviewResponse = await ReviewsDAO.deleteReview (
                reviewId,
                userId,
            );

            // Sending a success response.
            req.json({status:"success"});
        } catch(e) {
            // Handling errors and sending an error response if something goes wrong.
            req.status(500).json({error: e.message});
        }
    }
}