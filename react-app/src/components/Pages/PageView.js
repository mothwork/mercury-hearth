import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getPages } from '../../store/page';
import { deletePage } from '../../store/page';

import TemplateEngine from '../Templates/TemplateEngine'

const PageView = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let { pageId, projectId } = useParams()
    pageId = parseInt(pageId)
    projectId = parseInt(projectId)

    // useEffect(async () => {
    //     await dispatch(getPages(projectId))
    // }, [dispatch, projectId])

    useEffect( () => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])

    const pages = useSelector(state => state.pages.pages)
    console.log(pages)
    const page = pages?.[pageId]

    const handleDelete = async () => {
        const confirmed = window.confirm('Deleting a page will delete all cards associated with it. Are you sure?')
        if (confirmed) {
            await dispatch(deletePage(page))
            await dispatch(getPages(projectId))
            history.push(`/projects/${projectId}`)
        }
    }

    if (page) {
        return (
            <>
                <div className='page-view-container'>
                    <div className='page-header'>
                        <h1>{page.title}</h1>
                        <div className='option-container'>
                            <NavLink to={`/projects/${projectId}/${pageId}/edit`}>
                                <button className='option-button'>Edit</button>
                            </NavLink>
                            <button className='option-button' onClick={handleDelete}>Delete</button>
                        </div>
                        <TemplateEngine page={page} />
                    </div>
                </div>

            </>
        )
    }

    return (null)
}

export default PageView
