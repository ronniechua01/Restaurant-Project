import http from "../http-common";

//functions that make API calls
class RestaurantDataService {
  //get all restaurants 
  //the url in http.get is what follows the baseURL in http-common
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }
  //get specific id
  get(id) {
    return http.get(`/id/${id}`);
  }
  //get request using three components
  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }
  //create post
  createReview(data) {
    return http.post("/review", data);
  }
  //update put
  updateReview(data) {
    return http.put("/review", data);
  }
  //delete
  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`
    );
  }
  //get cuisines
  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();
