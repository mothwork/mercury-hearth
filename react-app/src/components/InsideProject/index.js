import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getProjects } from "../../store/project";
import EditProjectModal from "../Projects/EditProjectModal";
import { deleteProject } from '../../store/project';
import Pages from "../Pages";
import './InsideProject.css'



const InsideProject = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { projectId } = useParams()
    const id = parseInt(projectId)
    const user = useSelector(state => state.session.user);

    const projectsContainer = useSelector(state => state.project)

    const projects = projectsContainer?.projects
    const project = projects?.[id]

    const handleDelete = async () => {
        const confirmed = window.confirm('Deleting a project will delete all pages and cards associated with it. Are you sure?')
        if (confirmed) {
            await dispatch(deleteProject(project))
            // await dispatch(getProjects())
            history.push('/projects/')
        }
    }

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    if (project) {
        return (
            <>
                <div className="project-container">
                    <NavLink to='/projects'>
                        <button className='project-button'>Back</button>
                    </NavLink>
                    <h1 className="project-title">{project.title}</h1>
                    <p className="project-description">{project.description}</p>
                    <div className="project-options">
                        <EditProjectModal />
                        <button className='option-button' onClick={() => { handleDelete() }}>Delete</button>
                    </div>
                    <h2>Pages</h2>
                    <Pages />
                </div>

            </>
        )
    }
    return (<>No project info :()</>)

}

export default InsideProject
