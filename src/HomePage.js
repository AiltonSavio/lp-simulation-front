/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

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

const dataContainerStyle = {
  width: '60%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2rem 0',
  padding: '1rem',
  backgroundColor: '#fff',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const dataStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1rem 0',
  color: '#333',
};

const labelStyle = {
  fontWeight: 'bold',
  marginRight: '0.5rem',
};

const inputStyle = {
  width: '60%',
  maxWidth: '300px',
  height: '2.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '0 0.5rem',
  fontSize: '1rem',
  marginTop: '0.5rem',
};

const buttonStyle = {
  backgroundColor: '#6394f8',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '1rem',
};

const leaderboardContainerStyle = {
  width: '60%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2rem 0',
};

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  const [poolData, setPoolData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/leaderboard/${email}`);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
          const user = await axios.get(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true })
          console.log(user.data);
          isMounted && setUserData(user.data);
          setEmail(user.data.email);
          if (user.data.poolAddress) {
            try {
              const pool = await axios.get(`${process.env.REACT_APP_API_URL}/pools/${user.data.poolAddress}`, { withCredentials: true })
              console.log(pool.data);
              isMounted && setPoolData(pool.data);
            } catch (err) {}
          }
      } catch (err) {
          console.error(err);
          navigate('/', { state: { from: location }, replace: true });
      }
    }

    getUser();

    return () => {
        isMounted = false;
        controller.abort();
    }
  }, [])

  return (
    <div style={pageStyle}>
      <Navbar />
      <h1 style={headerStyle}>Home</h1>
      <div style={dataContainerStyle}>
        <div style={dataStyle}>
          <span style={labelStyle}>Email: </span>
          <span>{userData.email}</span>
        </div>
        <div style={dataStyle}>
          <span style={labelStyle}>Balance: </span>
          <span>{`$${userData.balance} USD`}</span>
        </div>
        {poolData.name && (
          <>
          <div style={dataStyle}>
            <span style={labelStyle}>Pool Name: </span>
            <span>{poolData.name}</span>
          </div>
          <div style={dataStyle}>
            <span style={labelStyle}>Pool Price: </span>
            <span>{`$${poolData.price.toFixed(2)} USD`}</span>
          </div>
          </>
        )}
        <div style={dataStyle}>
          <span style={labelStyle}>Pool Shares: </span>
          <span>{userData.poolShares}</span>
        </div>
      </div>
      <div style={leaderboardContainerStyle}>
        <label htmlFor="email-input">Email: </label>
        <input
          id="email-input"
          style={inputStyle}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleClick}>
          View Portfolio
        </button>
      </div>
    </div>
  );
};

export default HomePage;