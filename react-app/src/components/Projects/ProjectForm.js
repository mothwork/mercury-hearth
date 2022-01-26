import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createProject } from '../../store/project';
import { getProjects } from '../../store/project';

const ProjectForm = ({modalSetter}) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.length) {
            setErrors(['Project Title Required'])
            return null
        }
        const userId = user.id

        const newProject = {
            title,
            description,
            userId
        }

        if (newProject) {
            await dispatch(createProject(newProject))
            await dispatch(getProjects())
        }
        modalSetter()
        return history.push('/projects')
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    return (
        <>
            <h2 className='modal-label'>New Project</h2>
            <form autoComplete='off' className='auth-form project-form' onSubmit={handleSubmit}>
                <div className='error-box'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                {/* <label>Project Title</label> */}
                <input
                    type='text'
                    name='title'
                    placeholder='Project Title'
                    onChange={updateTitle}
                    value={title}
                    
                    autoComplete='off'
                    ></input>
                {/* <label>Description</label> */}
                <textarea
                    type='textarea'
                    name='description'
                    placeholder='Description'
                    onChange={updateDescription}
                    value={description}
                    autoComplete='off'
                    cols={50}
                    rows={10}
                    ></textarea>
                <button className='project-button'>Create Project</button>
            </form>
        </>
    )
}

export default ProjectForm
