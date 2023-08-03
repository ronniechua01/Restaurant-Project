import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {
    //api get restaurants method
    //when this api is called, there will be a query string
    //query string can specify certain parameters
    static async apiGetRestaurants(req, res, next){
        // set restaurantsPerPage variable to the value passed in the url
        // check first if it exist, if yes, then convert it to int, if not it equals 20
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt (req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.cusine) {
            filters.cuisine = req.query.cuisine
        }
        else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        }
        else if (req.query.name) {
            filters.name = req.query.name
        }

        //call getRestaurants

        const {restaurantsList, totalNumRestaurants} = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        })
        //create response to respond when api url is called
        let response = {
            restaurants : restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants
        }

        //send a json type response
        res.json(response)
    }
}