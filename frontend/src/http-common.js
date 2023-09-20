import axios from "axios";

export default axios.create ({

    //add base url 
    //used to be able to create API reqs
    baseURL: "http://localhost:5000/api/v1/restaurants",
    headers: {
        "Content-type": "application/json"
    }
});