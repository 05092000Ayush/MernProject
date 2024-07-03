import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        setErrorMessage("Please provide both email and password");
        return;
      }

      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      // Login successful
      navigate('/user-management', { replace: true });
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrorMessage("Failed to log in. Please try again later.");
    }
  };

  const handleLoginClick = () => {
    window.location.href = "/registration";
  }

  return (
    <div>
      <>

        <div className="mt-5 px-5 py-5 w-lg-50 w-md-75 w-sm-75 position-relative top-50 start-50 translate-middle-x">
          <div className='col-lg-6 col-md-8 col-sm-10 mx-auto'>

            <h2>Log in</h2>
            {errorMessage && <b className="error-message text-danger">{errorMessage}</b>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <button type="submit" className="btn btn-primary rounded-pill">Log in</button>
              </div>
            </form>
            <hr />
            <div className="create-account">
              <p className='float-end'>Don't have an account? <span onClick={handleLoginClick} className="change">Sign up</span></p>
            </div>
          </div>
        </div>

      </>

    </div>
  );
}

export default LoginForm;
