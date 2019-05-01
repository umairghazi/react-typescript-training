import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    // nav>ul.list-inline>li.list-inline-item*4
    <nav>
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/demos">Demos</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/payees">Payees</Link>
        </li>
        <li className="list-inline-item">Transactions</li>
      </ul>
    </nav>
  );
};

export default Navbar;
