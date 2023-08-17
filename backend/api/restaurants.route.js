import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"


//get access to express router

const router = express.Router()
 
//root url responds restaurant controller
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
//get lists of all restaurants and reviews on that restaurant
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
//get lists of all cuisines 
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

//rest
router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)
    
export default router