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
            res.json({status:"success"});
        } catch(e) {
            // Handling errors and sending an error response if something goes wrong.
            res.status(500).json({error: e.message});
        }
    }

   // This method handles updating an existing review.
static async apiUpdateReview(req, res, next) {
    try {
        // Extract the review ID, updated text, and current date from the request body.
        const reviewId = req.body.review_id;
        const text = req.body.text;
        const date = new Date();

        // Call the updateReview method from ReviewsDAO to update the review.
        const reviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            req.body.user_id, // ID of the user who posted the review.
            text,             // Updated text for the review.
            date              // Current date indicating the update.
        );

        // Check if there's an error response from the update operation.
        var { error } = reviewResponse;
        if (error) {
            // If there's an error, respond with a 400 status and the error message.
            res.status(400).json({ error });
        }

        // Check if the review was successfully modified.
        if (reviewResponse.modifiedCount === 0) {
            // If no reviews were modified, throw an error indicating that the user may not be the original poster.
            throw new Error("Unable to update review - user may not be original poster");
        }

        // Respond with a success status if the update was successful.
        res.json({ status: "success" });
    } catch (e) {
        // If an error occurs during the update process, respond with a 500 status and the error message.
        res.status(500).json({ error: e.message });
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
            res.json({status:"success"});
        } catch(e) {
            // Handling errors and sending an error response if something goes wrong.
            res.status(500).json({error: e.message});
        }
    }
    
}