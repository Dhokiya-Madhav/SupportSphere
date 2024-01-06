import React, { useState } from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [usrEmail, setUsrEmail] = useState(null);
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

  const forgotPassword = (e) => {
    setUsrEmail(e.target.value);
  }

  const displayEmail = async() => {
    console.log(usrEmail);
    localStorage.setItem("passwordResetEmail",usrEmail)
    console.log(localStorage.getItem("passwordResetEmail"));
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: usrEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Email sent successfully , check your email")
        console.log("Email sent successfully:", result.message);
      } else {
        alert("Enter valid email")
        console.error("Error sending email:", result.message);
      }
    } catch (error) {
      alert("Enter valid email")
      console.error("Error sending email:", error.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        sessionStorage.setItem("userEmail", result.data.email);
        window.location = 'http://localhost:3000/';
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
                <button type="button" class="btn btn-outline-dark ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Forgot password
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Enter your email</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <input type="email" value={usrEmail} onChange={forgotPassword} className="form-control" placeholder="Email Id" style={{ borderWidth: 5 }} />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onClick={displayEmail} data-bs-dismiss="modal">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
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
