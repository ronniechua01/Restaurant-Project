// Import necessary modules and components from React and the application's services
import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

// Define a functional component called AddReview that takes props as an argument
const AddReview = props => {
  // Initialize variables for the review text and editing status
  let initialReviewState = ""
  let editing = false;

  // Check if there is a current review passed as a prop in the location state
  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  // Use the useState hook to create state variables for the review text and submission status
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  // Define a function to handle changes in the review text input field
  const handleInputChange = event => {
    setReview(event.target.value);
  };

  // Define a function to save the review to the database
  const saveReview = () => {
    // Prepare the review data object to be sent to the server
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    };

    // If editing an existing review, include the review ID in the data object
    if (editing) {
      data.review_id = props.location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      // If creating a new review, use the createReview function from RestaurantDataService
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  // Render the AddReview component
  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          Please log in.
        </div>
      )}
    </div>
  );
};

export default AddReview;
