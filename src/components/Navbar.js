import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 1rem',
  cursor: 'pointer',
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/home">
        Home
      </Link>
      <Link style={linkStyle} to="/pools">
        Pools
      </Link>
      <span style={linkStyle} onClick={async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/authentication/logout`, {}, { withCredentials: true }).then((response) => {
          alert('Logout successful!')
          console.log(response.data)
          navigate(`/`);
        })
        .catch((error) => {
          console.error(error.response.data.message);
        }); 
      }}>
        Logout
      </span>
    </nav>
  );
};

export default Navbar;
