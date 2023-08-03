import express from "express"
import RestaurantsCtrl from "../dao/restaurants.controller.js"

//get access to express router

const router = express.Router()
 
//root url responds restaurant controller
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

export default router