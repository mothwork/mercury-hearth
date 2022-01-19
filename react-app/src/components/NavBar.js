
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from './auth/LoginFormModal';
import LogoutButton from './auth/LogoutButton';
import SignUpModal from './auth/SignUpModal';
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <div className='logo'></div>
        </li>
        <li>
          <NavLink to='/projects/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <LoginFormModal/>
        </li>
        <li>
          <SignUpModal/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
