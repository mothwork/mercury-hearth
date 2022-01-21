import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getPages } from '../../store/page';
import { deletePage } from '../../store/page';


const PageView = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let { pageId, projectId } = useParams()
    pageId = parseInt(pageId)
    projectId = parseInt(projectId)

    useEffect(async ()=>{
        await dispatch(getPages(projectId))
    }, [dispatch])

    const pages = useSelector(state => state.pages.pages)
    console.log('PAGES2', pages)

    const page = pages?.[pageId]

    const handleDelete = async () => {
        const confirmed = window.confirm('Deleting a page will delete all cards associated with it. Are you sure?')
        if (confirmed) {
            await dispatch(deletePage(page))
            await dispatch(getPages())
            history.push('/projects/')
        }
    }

    if (page) {
    return (
        <>
            <div className='page-view-container'>
                <div className='page-header'>
                <h1>{page.title}</h1>
                <button className='project-button'>Edit</button>
                <button className='project-button' onClick={handleDelete}>Delete</button>
            <div>
                {page.content}
            </div>
                </div>
            </div>

        </>
    )
    }
    return (<>Loading</>)
}

export default PageView
