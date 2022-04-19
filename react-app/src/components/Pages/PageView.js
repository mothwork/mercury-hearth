import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getPages } from '../../store/page';
import { deletePage } from '../../store/page';
import ImageModal from './ImageModal';
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

    const page = pages?.[pageId]

    const handleDelete = async () => {
        const confirmed = window.confirm('Deleting a page will delete all cards associated with it. Are you sure?')
        if (confirmed) {
            await dispatch(deletePage(page))
            await dispatch(getPages(projectId))
            history.push(`/projects/${projectId}`)
        }
    }

    const generateImage = (obj) => {
        const type = obj.pageType
        if (type === 'country') {
            return 'https://images.unsplash.com/photo-1596319682968-c8d4875a6f17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
        }
        if (type === 'continent') {
            return 'https://images.unsplash.com/photo-1543191879-742cb35a3a4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
        }
        else return 'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80'
    }



    if (page) {
        const pageContent = JSON.parse(page.content);
        let image;
        console.log(page)
        if (page.image !== undefined ) {
            image = page.image
        } else {
            image = generateImage(pageContent)
        }


        //TODO Add in photo uploads
        return (
            <>
                <div className='page-view-container'>

                        <div className='page-image'>
                            <img alt='' src={image}></img>
                        </div>
                        <ImageModal/>

                        <div className='page-icon'>
                            {/* <img alt='' src={icon}></img> */}
                        </div>
                    <div className='page-header'>

                        <h1>{page.title}</h1>
                        <div className='option-container'>
                            <NavLink to={`/pages/${projectId}/${pageId}`}>
                                <button className='card-button'>Mood Board</button>
                            </NavLink>
                            <div>
                            <NavLink to={`/projects/${projectId}/${pageId}/edit`}>
                                <button className='option-button'>Edit</button>
                            </NavLink>
                            <button className='option-button' onClick={handleDelete}>Delete</button>
                            </div>
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
