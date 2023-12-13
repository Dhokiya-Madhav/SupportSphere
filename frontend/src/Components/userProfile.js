import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetch("http://localhost:5000/user-profile/" + sessionStorage.getItem('userEmail'), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                
                setFormData(data)
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const logout = (e)=>{
        e.preventDefault();
        sessionStorage.clear();
        window.location="http://localhost:3000/";
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted:", formData);
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/user-profile-update/${sessionStorage.getItem('userEmail')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('User profile updated successfully');
                    sessionStorage.setItem('userEmail',formData.email)
                } else {
                    console.error('Error updating user profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating user profile:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Form has errors, handle them accordingly
            console.log("Form has errors:", newErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.username.trim()) {
            errors.username = "Username is required";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
        }

        if (!data.city.trim()) {
            errors.city = "City is required";
        }

        /*
        if (!data.phoneNumber.trim()) {
            errors.phoneNumber = "Phone Number is required";
        } else if (!/^\d{10}$/.test(data.phoneNumber)) {
            errors.phoneNumber = "Phone Number must be 10 digits";
        }
        */
        return errors;
    };

    return (
        <div className="container mt-2">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ boxShadow: '0 4px 20px rgba(100,100,100)', border: '0px', padding: '20px' }}>
                        <div className="card-header">
                            <center><h2>User Profile</h2></center>
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
                                    <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" value={formData.email} onChange={handleChange} required />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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

                                <button type="submit" className="btn btn-outline-dark">
                                    {isLoading ? "Updating..." : "Update Profile"}
                                </button>
                                <button className="btn btn-outline-dark ms-2" onClick={logout}>Logout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
