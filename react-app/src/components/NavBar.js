
import React from 'react';
import LoginFormModal from './auth/LoginFormModal';
import SignUpModal from './auth/SignUpModal';
import "./NavBar.css"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/session';

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const demoLogin = async () => {
    await dispatch(login('demo@aa.io', 'password'));
    return history.push(`/projects`);
};
  return (
    <nav>
      <ul>
        <li>
          <div className='logo'></div>
        </li>
        <li>
          <LoginFormModal/>
        </li>
        <li>
          <SignUpModal/>
        </li>
        <li>
          <button className='nav-buttons' onClick={demoLogin}>Demo Now</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
