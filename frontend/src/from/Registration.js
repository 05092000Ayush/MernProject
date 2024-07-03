import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./style.model.css";
import ValidationForm from "./ValidationForm";

function Registration() {
  const { token } = useParams(); // Extract token from URL //return object which is saved in key value pair

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verificationToken: token // Set verification token from URL parameter
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = ValidationForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setRegistrationSuccess(true);
        } else {
          const errorData = await response.json(); // assuming server returns error details
          setErrors(errorData.errors); // update errors based on server response
        }
      } catch (error) {
        console.error('Error registering user:', error.message);
        // Handle other errors, e.g., network issues
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    const verifyEmail = async () => {
      debugger
      try {
        const response = await fetch(`http://localhost:3000/verify-email/${formData.verificationToken}`, {
          method: 'GET'
        });

        if (response.ok) {
          setVerificationSuccess(true);
        } else {
          console.error('Error verifying email:', response.statusText);
          // Handle verification errors
        }
      } catch (error) {
        console.error('Error verifying email:', error.message);
        // Handle other errors, e.g., network issues
      }
    };

    if (registrationSuccess && !verificationSuccess && formData.verificationToken) {
      verifyEmail();
    }
  }, [registrationSuccess, verificationSuccess, formData.verificationToken]);

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="registration-container">
      {loading ? (
        <p>Loading...</p>
      ) : registrationSuccess ? (
        <div>
          {verificationSuccess ? (
            <p>Email verified successfully. You can now <Link to='/login'>login</Link>.</p>
          ) : (
            <>
              <p>Registration successful. Please check your email for verification.</p>
              <p>If you haven't received the email, please wait or check your spam folder.</p>
            </>
          )}
        </div>
      ) : (
        <>
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <span>{errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <span>{errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}</span>
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span>{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}</span>
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span>{errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}</span>
            </div>
            <div className="input-group">
              <button type="submit">Sign Up</button>
            </div>
            <div className="text-right">
              <p>Already have an account? <span onClick={handleLoginClick} className="change">Login here</span>.</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Registration;
