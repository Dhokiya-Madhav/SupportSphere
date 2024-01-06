import React, { useState } from "react";

export default function Reset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem('passwordResetEmail');
    try {
      const response = await fetch("http://localhost:5000/resetPassword/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ psw: confirmPassword, email: email }),
      });

      if (response.ok) {
        const responseData = await response.json();
        window.location='http://localhost:3000/login'
        alert("Password changed successfully")
      }
      else {
        alert("Try again later")
      }
    } catch {

    }
    setNewPassword("");
    setConfirmPassword("");
    setValidationError("");
  };

  const setPassword = () => {

  }

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <div className="row justify-content-md-center">
        <div className="col-md-6" style={{ boxShadow: '0 4px 20px rgba(100,100,100)', border: '0px', padding: '20px', borderRadius: 10 }}>
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {validationError && (
              <p className="text-danger">{validationError}</p>
            )}

            <button type="submit" className="btn btn-outline-dark">Reset Password</button>
          </form>
        </div>
      </div>
      <br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}
