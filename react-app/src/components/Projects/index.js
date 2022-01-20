import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getProjects } from '../../store/project';
import LogoutButton from '../auth/LogoutButton';
import ProjectModal from './ProjectModal';
import './Projects.css'

const Project = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(async () => {
        await dispatch(getProjects())
    }, [dispatch])



    let projects = useSelector(state => {
        return state.project.projectArray
    })

    console.log(projects)

    if (!user) {
        return <Redirect to='/' />
    }


    if (projects) {
        return (
            <>
                <div className='user-nav'>
                    <LogoutButton/>
                </div>
                <div className='project-container'>
                    <h1>Projects</h1>
                    <ProjectModal/>
                    <ul>
                        {projects.map(project => {
                            return (
                                <li>
                                    <NavLink to={`/project/${project.id}/`}>
                                        <button className='project-button'>{project.title}</button>
                                    </NavLink>
                                </li>

                            )
                        })}
                    </ul>
                </div>
            </>
        )
    } else {
        return ('No projects')
    }

}

export default Project;
