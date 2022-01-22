import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getPages } from '../../store/page';
import './Pages.css'


const Pages = () => {
    const dispatch = useDispatch()
    const { projectId } = useParams()
    const id = parseInt(projectId)

    useEffect(() => {
        dispatch(getPages(id))
    },[dispatch, id])

    const pages = useSelector(state=> state.pages.pageArray)


    console.log(pages)
    if (pages) {
        return (
            <>
                <div className='page-container'>
                    <NavLink to={`/projects/${id}/new`}>
                        <button className='project-button'>+ New Page</button>
                    </NavLink>
                    <ul>
                        {pages.map(page => {
                            return (
                                <li>
                                    <NavLink to={`/projects/${id}/${page.id}`}>
                                        <button className='project-button'>{page.title}</button>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
        )
    }
    return ('No Pages :(')

}

export default Pages
