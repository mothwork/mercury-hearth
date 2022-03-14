
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditObjectForm = ({object, page}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const userId = user.id
    const pageType = 'object'
    const id = page.id

    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(page.title)
    const [objectType, setObjectType] = useState(object.objectType)
    const [content, setContent] = useState(object.content)



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
            id,
            title,
            userId,
            projectId,
        }
        page.content = JSON.stringify(pageContent)
        const newPage = await dispatch(editPage(page))
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
            <label>Title</label>
            <input
                placeholder='Title'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
                required={true}
            ></input>
            <label>Object Type</label>
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
            <button className='template-button' type="submit" onClick={handleSubmit}>Edit {objectType}</button>
        </form>
    )
}

export default EditObjectForm
