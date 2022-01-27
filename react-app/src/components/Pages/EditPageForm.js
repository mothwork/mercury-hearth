import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink} from 'react-router-dom';
import { getPages } from '../../store/page';
import { useParams } from 'react-router-dom';
import EditEngine from '../TemplateForms/EditEngine';

const EditPageForm = () => {
    const dispatch = useDispatch()
    let { projectId, pageId } = useParams()
    projectId = parseInt(projectId)
    pageId = parseInt(pageId)

    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])

    const pagesContainer = useSelector(state => state.pages)
    const pages = pagesContainer.pages

    const page = pages?.[pageId]

    if (page) {
        return (
            <>
                <div className='page-form'>
                    <NavLink to={`/projects/${projectId}/${pageId}`}>
                        <button className='project-button'>Back</button>
                    </NavLink>
                    <h2 className='modal-label'>Edit {page.title}</h2>
                    <EditEngine page={page}/>
                </div>
            </>
        )
    }
    return null
}

export default EditPageForm
