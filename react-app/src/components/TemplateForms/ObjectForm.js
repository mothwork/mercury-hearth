
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ObjectForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const userId = user.id
    const pageType = 'object'

    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [objectType, setObjectType] = useState('')



    const handleSubmit = async e => {
        e.preventDefault()
        if (!title.length) {
            setErrors(['Title Required'])
            return null
        }

        const pageContent = {
            pageType,
            objectType,
            content
        }
        const page = {
            title,
            userId,
            projectId,
        }
        page.content = JSON.stringify(pageContent)
        const newPage = await dispatch(createPage(page))
        history.push(`/projects/${newPage.projectId}/${newPage.id}`)

    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateObjectType = (e) => {
        setObjectType(e.target.value)
    }

    return (

        <form className='project-form new-page-form'>
            <div className='error-box'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <input hidden name='pageType' readOnly value={pageType}></input>
            {/* <label>Title</label> */}
            <input
                placeholder='Title'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
                required={true}
            ></input>
            <input
                placeholder='Object Type'
                type='text'
                name='objectType'
                onChange={updateObjectType}
                value={objectType}
                autoComplete='off'
                required={true}
            ></input>
            <div className='quilltainer'>
            <ReactQuill theme='snow' value={content} onChange={setContent}/>
            </div>
            <button className='template-button' type="submit" onClick={handleSubmit}>Create {objectType}</button>
        </form>
    )
}

export default ObjectForm
