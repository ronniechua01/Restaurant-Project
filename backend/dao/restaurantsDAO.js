//create variable restaurants

let restaurants

export default class RestaurantsDAO {
    //initialize connection to database
    //get reference to restaurants database
    static async injectDB(conn) {
        if (restaurants){
            //if restaurants is fiiled, return
            return
        }
        try {
            //if not filled, connect to db in the environment variable restreviews_ns, and use the collection "restaurants"
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        }
        catch (e) {
            console.error(
                'Unable to establish collection handle: ${e}',
            )
        }
    }

    static async getRestaurants({
        //sorting
            filters = null,
            page = 0,
            restaurantsPerPage = 20,
        } = {}) {
            //empty query
            let query
            if (filters) {
                if ("name" in filters) {
                    //search for name anywhere in text
                    query = {$text: { $search: filters["name"]}}
                }
                else if ("cuisine" in filters){
                    //search for cusine anywhere in database field "cuisine"
                    query = {"cuisine": {$eq: filters["cuisine"]}}
                }
                    //search for zipcode anywhere in database field "address.zipcode"
                else if ("zipcode" in filters){
                    query = {"address.zipcode": {$eq: filters["zipcode"]}}
                }
            }

            let cursor 

            try {
                cursor = await restaurants
                    .find(query) //find all restaurants that satisfies the query filter
            } catch (e) {
                console.error('Unable to issue find command, $(e)')
                return { restaurantsList: [], totalNumRestaurants:0}
            }
            // limit the results using restaurants per page variable, and get page number using skip
            const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

            try {
                const restaurantsList = await displayCursor.toArray() //make restaurantsList an array
                const totalNumRestaurants = await restaurants.countDocuments(query) //get total number of restaurants
                return {restaurantsList, totalNumRestaurants} //return restaurantslist and total number of restaurants
            } catch (e) {
                console.error(
                    'Unable to conver cursor to array or problem counting documents, $(e)',
                )
                return {restaurantsList: [], totalNumRestaurants: 0}
            }
        }
}
