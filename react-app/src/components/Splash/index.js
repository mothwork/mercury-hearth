
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
                        <li>
                            <LoginFormModal />
                        </li>
                        <li>
                            <SignUpModal />
                        </li>
                        <li>
                            <button className='nav-buttons' onClick={demoLogin}>Demo Now</button>
                        </li>
                    </ul>
                </div>
                    <div className='img-div'>
                        <img className='img-circle' src='https://images.unsplash.com/photo-1589807867695-d541586cd70c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1'></img>
                    </div>
                    <h1>Mercury Hearth</h1>
                    <p className='about-line'>Mercury Hearth is a worldbuilding application that allows you to create expansive worlds for your TTRPG, fiction, and video game projects.</p>

                    <p className='about-line'>Built by Brett Hageft <a target='_blank' rel='noreferrer' href='https://github.com/mothwork'>github</a>::<a rel='noreferrer' target='_blank' href='https://www.linkedin.com/in/mothwork'>LinkedIn</a></p>

                </div>
            </div>

        </>
    )
}

export default Splash
