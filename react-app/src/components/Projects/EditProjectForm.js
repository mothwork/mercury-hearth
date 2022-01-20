import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createProject } from '../../store/project';
import { getProjects } from '../../store/project';

const ProjectForm = ({modalSetter}) => {
    const { projectId } = useParams()
    const id = parseInt(projectId)
    const projectsContainer = useSelector(state => state.project)
    const projects = projectsContainer?.projects
    const project = projects?.[id]

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(project.title)
    const [description, setDescription] = useState(project.description)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = user.id
        const editedProject = {
            title,
            description,
            userId
        }

        if (newProject) {
            const newProjectRes = await dispatch(editProject(editedProject))
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
            <h2 className='modal-label'>Edit Project</h2>
            <form autoComplete='off' className='project-form' onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <label>Project Title</label>
                <input
                    type='text'
                    name='title'
                    onChange={updateTitle}
                    value={title}
                    required
                    autoComplete='off'
                    ></input>
                <label>Description</label>
                <textarea
                    type='textarea'
                    name='description'
                    onChange={updateDescription}
                    value={description}
                    required
                    autoComplete='off'
                    cols={50}
                    rows={10}
                    ></textarea>
                <button className='new-project-submit project-button'>Save Changes</button>
            </form>
        </>
    )
}

export default ProjectForm
