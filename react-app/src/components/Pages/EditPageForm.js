import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { editPage, getPages } from '../../store/page';
import { useParams } from 'react-router-dom';
import EditEngine from '../TemplateForms/EditEngine';

const EditPageForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId, pageId } = useParams()
    projectId = parseInt(projectId)
    pageId = parseInt(pageId)

    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])

    const pagesContainer = useSelector(state => state.pages)
    const pages = pagesContainer.pages

    const page = pages?.[pageId]


    // const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(page?.title)
    const [content, setContent] = useState(page?.content)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = user.id
        const id = pageId
        const editedPage = {
            id,
            title,
            content,
            userId,
            projectId
        }

        if (editedPage) {
            const newPageRes = await dispatch(editPage(editedPage))
            await dispatch(getPages(projectId))
            return history.push(`/projects/${projectId}/${newPageRes.id}`)
        }

        // Send to edited page
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    if (page) {
        return (
            <>
                <div className='page-form'>
                    <NavLink to={`/projects/${projectId}/${pageId}`}>
                        <button className='project-button'>Back</button>
                    </NavLink>
                    <h2 className='modal-label'>Edit {page.title}</h2>
                    <EditEngine page={page}/>
                    {/* <form autoComplete='off' className='project-form' onSubmit={handleSubmit}>
                        {/* <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <label>Page Title</label>
                        <input
                            type='text'
                            name='title'
                            onChange={updateTitle}
                            value={title}
                            required
                            autoComplete='off'
                        ></input>
                        <label>Content</label>
                        <textarea
                            type='textarea'
                            name='description'
                            onChange={updateContent}
                            value={content}
                            autoComplete='off'
                            cols={50}
                            rows={20}
                        ></textarea>
                        <button className='new-project-submit project-button'>Save Changes</button>
                    </form> */}
                </div>
            </>
        )
    }
    return null
}

export default EditPageForm
