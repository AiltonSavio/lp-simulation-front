import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';

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

const tableContainerStyle = {
  width: '60%',
  maxWidth: '800px',
  margin: '2rem 0',
  backgroundColor: '#fff',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  backgroundColor: '#333',
  color: '#fff',
  fontWeight: 'bold',
  padding: '0.5rem',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '0.5rem',
};

const LeaderboardPage = () => {
  const { email } = useParams();
  const [portfolio, setPortfolio] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPools = async () => {
      try {
          const pool = await axios.get(`${process.env.REACT_APP_API_URL}/leaderboard/${email}`, { withCredentials: true })
          console.log(pool.data);
          isMounted && setPortfolio(pool.data);
      } catch (err) {
          console.error(err);
          navigate('/home', { state: { from: location }, replace: true });
      }
    }

    getPools();

    return () => {
        isMounted = false;
        controller.abort();
    }
  }, [])

  return (
    <div style={pageStyle}>
      <Navbar />
      <h1 style={headerStyle}>Leaderboard</h1>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Portfolio (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, textAlign: 'left' }}>{email}</td>
              <td style={{ ...tdStyle, textAlign: 'left' }}>${portfolio}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
