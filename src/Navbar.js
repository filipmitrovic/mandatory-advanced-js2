import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <>
    <ul>
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/Add">Add</Link>
      </li>
    </ul>
  </>
);

export default Navbar