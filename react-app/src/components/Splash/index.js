
import React from 'react';
import './Splash.css'
import '../NavBar.css'
import LoginFormModal from '../auth/LoginFormModal'
import SignUpModal from '../auth/SignUpModal'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

const Splash = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const demoLogin = async () => {
        await dispatch(login('demo@aa.io', 'password'));
        return history.push(`/projects`);
    }

    return (
        <>
            <div className="splash-container">

                <div className="splash-header">
                <div className='login-links'>
                    <ul>
                        <li className='login-link'>
                            <LoginFormModal />
                        </li>
                        <li className='login-link'>
                            <SignUpModal />
                        </li>
                        <li className='long-link'>
                            <button className='nav-buttons' onClick={demoLogin}>Demo Now</button>
                        </li>
                    </ul>
                </div>
                    <div className='title-group'>
                    <h1 className='splash-title'>Mercury Hearth</h1>
                    <p className='about-line'>Create expansive worlds for your TTRPG, fiction, and video game projects.</p>
                    </div>
                    <p className='about-line'>Built by Brett Hageft <a target='_blank' rel='noreferrer' href='https://github.com/mothwork'>github</a>::<a rel='noreferrer' target='_blank' href='https://www.linkedin.com/in/mothwork'>LinkedIn</a></p>

                </div>
            </div>

        </>
    )
}

export default Splash
