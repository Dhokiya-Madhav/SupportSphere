import React, { useState} from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login logic here
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login Successful")
        console.log(result.data.email);
        sessionStorage.setItem("userEmail",result.data.email);
        window.location='http://localhost:3000/';
      } else {
        console.error("Login failed:", result.message);
        alert("Invalid email or password")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mt-2" style={{ maxWidth: '900px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ boxShadow: '0 4px 20px rgba(100,100,100)', border: '0px', padding: '20px' }}>
            <div className="card-header">
              <center>
                <h2>Login</h2>
              </center>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-outline-dark">
                  Login
                </button>
                <Link to='/signUp' className="ms-2">Don't have account?Sign up</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
