import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
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

const buttonStyle = {
  backgroundColor: '#6394f8',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

const columns = [
  {
    Header: 'Pool Address',
    accessor: 'address',
  },
  {
    Header: 'Pool Name',
    accessor: 'name',
  },
  {
    Header: 'Pool Price',
    accessor: 'price',
    Cell: ({ value }) => `$${value.toFixed(2)} USD`,
  },
  {
    Header: 'Action',
    Cell: ({ row }) => (
      <button style={buttonStyle} onClick={() => handleInvest(row.values.address)}>Invest</button>
    ),
  },
];

const handleInvest = async (poolAddress) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/invest`, { poolAddress }, { withCredentials: true });
    console.log(response.data);
    alert('Investment successful!');
  } catch (err) {
    console.error(err);
    alert('Investment failed!');
  }
};

const PoolsPage = () => {
  const [poolData, setPoolData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPools = async () => {
      try {
          const pool = await axios.get(`${process.env.REACT_APP_API_URL}/pools`, { withCredentials: true })
          console.log(pool.data);
          isMounted && setPoolData(pool.data);
      } catch (err) {
          console.error(err);
          navigate('/', { state: { from: location }, replace: true });
      }
    }

    getPools();

    return () => {
        isMounted = false;
        controller.abort();
    }
  }, [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: poolData,
  });

  return (
    <div style={pageStyle}>
      <Navbar />
      <h1 style={headerStyle}>Pools</h1>
      <div style={tableContainerStyle}>
        <table style={tableStyle} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th style={thStyle} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td style={tdStyle} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolsPage;