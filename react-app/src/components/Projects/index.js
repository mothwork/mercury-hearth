import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {NavLink, Redirect, redirect, useParams} from 'react-router-dom'
// import {getProjects} from

const Project = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    let projects = useSelector(state => {
        return state.projectArray
    })

    if (!user) {
        return <Redirect to='/' />
    }

    if (projects) {
        return (
            <>
                <div className='project-container'>
                    Project Container
                </div>
            </>
        )
    }

}
