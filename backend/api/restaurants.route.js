import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"


//get access to express router

const router = express.Router()
 
//root url responds restaurant controller
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

//rest
router
    .route("/review")
    .post(ReviewCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
    
export default router