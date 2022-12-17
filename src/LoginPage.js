import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  height: '100vh',
};

const headerStyle = {
  margin: '2rem 0',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
};

const buttonStyle = {
  backgroundColor: '#6394f8',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

const formStyle = {
  width: '50%',
  maxWidth: '600px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const fieldStyle = {
  marginBottom: '1rem',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
};

const errorStyle = {
  color: 'red',
  fontSize: '0.8rem',
};
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});


const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (email) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/authentication/login`, { email }, { withCredentials: true }).then((response) => {
      alert('Login successful!')
      console.log(response.data)
      navigate(`/home`);
    })
    .catch((error) => {
      alert('Login failed!')
      console.error(error.response.data.message);
    }); 
  };

  const handleRegister = async (email) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/authentication/register`, { email }, { withCredentials: true }).then((response) => {
      alert('Register successful!')
      console.log(response.data)
    })
    .catch((error) => {
      alert('Register failed!')
      console.error(error.response.data.message);
    }); 
  };


  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Login</h1>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values,) => {
          await handleLogin(values.email)
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form style={formStyle}>
            <Field style={fieldStyle} type="email" name="email" placeholder="Email" />
            {errors.email && touched.email && <div style={errorStyle}>{errors.email}</div>}
            <button style={buttonStyle} type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      <hr />
      <h1 style={headerStyle}>Register</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values,) => {
          await handleRegister(values.email)
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form style={formStyle}>
            <Field style={fieldStyle} type="email" name="email" placeholder="Email" />
            {errors.email && touched.email && <div style={errorStyle}>{errors.email}</div>}
            <button style={buttonStyle} type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;