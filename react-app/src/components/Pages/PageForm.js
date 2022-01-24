import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage, getPages } from '../../store/page';
import { useParams } from 'react-router-dom';

const PageForm = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('')
    const [content, setContent] =useState('')

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)


    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = user.id

        const newPage = {
            title,
            content,
            userId,
            projectId
        }

        if (newPage) {
            const newPageRes = await dispatch(createPage(newPage))
            await dispatch(getPages(projectId))
            return history.push(`/projects/${projectId}/${newPageRes.id}`)
        }

    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <>
            <div className='page-form'>
            <h2 className='modal-label'>New Page</h2>
            <form autoComplete='off' className='project-form' onSubmit={handleSubmit}>
                <div>
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
                <button className='new-project-submit project-button'>Create New Page</button>
            </form>
            </div>
        </>
    )
}

export default PageForm
