import React, { useState } from "react";

// Define a functional component called Login that takes props as an argument
const Login = props => {
  // Define the initial state for the user, with empty name and id
  const initialUserState = {
    name: "",
    id: "",
  };

  // Use the useState hook to create a state variable 'user' and a function 'setUser' to update it
  const [user, setUser] = useState(initialUserState);

  // Define a function to handle input changes in the form fields
  const handleInputChange = event => {
    // Extract the 'name' and 'value' properties from the input element that triggered the event
    const { name, value } = event.target;

    // Update the 'user' state by creating a new object with the previous state and updating the specific field
    setUser({ ...user, [name]: value });
  };

  // Define a function to handle the login action
  const login = () => {
    // Call the 'login' function passed in as a prop and pass the 'user' state as an argument
    props.login(user);

    // Redirect the user to the '/' route using the 'history' object from the props
    props.history.push('/');
  }

  // Render the login form
  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;