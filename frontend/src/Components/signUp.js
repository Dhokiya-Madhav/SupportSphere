import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [usrOtpValue, setUsrOtpValue] = useState("");
    const [otpError, setOtpError] = useState("");
    const [usrEmail, setUsrEmail] = useState(null);

    const handleOTPChange = (e) => {
        setUsrOtpValue(e.target.value)
    };

    const validateOTP = () => {
        let error = "";

        if (!otpValue.trim()) {
            error = "OTP is required";
        } else if (!/^\d{6}$/.test(otpValue)) {
            error = "OTP must be 6 digits";
        }

        return error;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = (data) => {
        let errors = {};

        // Basic validation, you can enhance this based on your requirements
        if (!data.username.trim()) {
            errors.username = "Username is required";
        }

        if (!data.email.trim()) {
            errors.email = "Email address is required";
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
            errors.email = "Email address is invalid";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(data.password)) {
            errors.password = "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character";
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (!data.city.trim()) {
            errors.city = "City is required";
        } else if (data.city.trim().length <= 2) {
            errors.city = "City name must be greater than 2 characters";
        }

        if (!data.phoneNumber.trim()) {
            errors.phoneNumber = "Phone Number is required";
        } else if (!/^\d{10}$/.test(data.phoneNumber)) {
            errors.phoneNumber = "Phone Number must be 10 digits";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setUsrEmail(e.target.value);
            try {
                const response = await fetch("http://localhost:5000/acc-verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: formData.email }),
                });

                const result = await response.json();

                if (response.ok) {
                    console.log(result.otp);
                    setOtpValue(result.otp)
                } else {
                    alert("Enter valid email")
                    console.error("Error sending email:", result.message);
                }
            } catch (error) {
                alert("Enter valid email")
                console.error("Error sending email:", error.message);
            }
            setShowModal(true)
            // try {
            //     const response = await fetch("http://localhost:5000/signup", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(formData),
            //     });
            //     console.log('====================================');
            //     console.log(response);
            //     console.log('====================================');
            //     if (response.ok) {
            //         const responseData = await response.json();
            //         console.log("User successfully registered:", responseData);
            //         alert("User successfully registered");
            //         window.location="http://localhost:3000/login"
                    
            //     } else if(response.status === 500) {
            //         console.error("Failed to register user");
            //         alert("User already exists");
            //     }
            // } catch (error) {
            //     console.error("Error during fetch:", error);
            // }
        } else {
            // Form has errors, handle them accordingly
            console.log("Form has errors:", newErrors);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (otpValue === usrOtpValue) {
            alert("OTP verified successfully");

            try {
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if (response.ok) {
                    const responseData = await response.json();
                    console.log("User successfully registered:", responseData);
                    alert("User successfully registered");
                    window.location="http://localhost:3000/login"
                    
                } else if(response.status === 500) {
                    console.error("Failed to register user");
                    alert("User already exists");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        } else {
            alert("Invalid OTP")
        }
    };

    return (
        <div className="container mt-2">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ boxShadow: '0 4px 20px rgba(100,100,100)', border: '0px', padding: '20px' }}>
                        <div className="card-header">
                            <center><h2>Sign Up</h2></center>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className={`form-control ${errors.username && 'is-invalid'}`} id="username" name="username" value={formData.username} onChange={handleChange} required />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} id="password" name="password" value={formData.password} onChange={handleChange} required />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className={`form-control ${errors.city && 'is-invalid'}`} id="city" name="city" value={formData.city} onChange={handleChange} required />
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="tel" className={`form-control ${errors.phoneNumber && 'is-invalid'}`} id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                </div>

                                <button type="submit" className="btn btn-outline-dark">Sign Up</button>
                            </form>
                        </div>

                        {showModal && (
                            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">OTP Verification</h5>
                                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>A One-Time Password (OTP) has been sent to your email id. Please enter the OTP below to complete the registration:</p>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="otpInput">Enter OTP:</label>
                                                    <input type="number" className="form-control" id="otpInput" onChange={handleOTPChange}/>
                                                </div>
                                                {otpError && <div className="text-danger">{otpError}</div>}
                                                <button type="submit" className="btn btn-dark mt-3" onClick={handleVerifyOTP}>Verify OTP</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
