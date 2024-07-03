import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserMangement.css';
import { Link } from 'react-router-dom';

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

function UserManagement() {
  const formInitialValue = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues: formInitialValue,
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/users', { // Adjust the URL according to your backend endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('User created successfully');
          resetForm();

        } else {
          console.error('Error creating user');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="text-center">User Management</h1>
            <Link to="/users-details" className="btn btn-secondary">View</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                onChange={handleChange}
                value={values.firstName}
              />
              <span style={{ color: 'red' }}>{errors.firstName}</span>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                onChange={handleChange}
                value={values.lastName}
              />
              <span style={{ color: 'red' }}>{errors.lastName}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={values.email}
              />
              <span style={{ color: 'red' }}>{errors.email}</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
