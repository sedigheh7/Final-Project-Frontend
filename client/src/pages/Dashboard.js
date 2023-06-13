import React from 'react';
import { NavLink } from 'react-router-dom';

import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="sidebar">
      <sidebar >
        <ul>
          <li>
            <NavLink to="/products" activeClassName="active">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-product" activeClassName="active">
              Add Product
            </NavLink>
          </li>
        </ul>
      </sidebar>
    </div>
  );
};

export default Dashboard;
