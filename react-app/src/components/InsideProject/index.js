import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getProjects } from "../../store/project";
import EditProjectModal from "../Projects/EditProjectModal";
import { deleteProject } from '../../store/project';





const InsideProject = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { projectId } = useParams()
    const id = parseInt(projectId)
    const user = useSelector(state => state.session.user);
    console.log('User',user)
    const projectsContainer = useSelector(state => state.project)
    console.log(projectsContainer)
    const projects = projectsContainer?.projects
    const project = projects?.[id]

    const handleDelete = async () => {
        const confirmed = window.confirm('Deleting a project will delete all pages and cards associated with it. Are you sure?')
        if (confirmed) {
            await dispatch(deleteProject(project))
            await dispatch(getProjects())
            history.push('/projects/')
        }
    }

    useEffect(() => {
        dispatch(getProjects())
    },[dispatch])
    if (project){
        return (
            <>
            <div className="project-container">
                <NavLink  to='/projects'>
                    <button className='project-button'>Back</button>
                </NavLink>
                <h1>{project.title}</h1>
                <p className="project-description">{project.description}</p>
                <EditProjectModal/>
                <button className='project-button' onClick={()=> {handleDelete()}}>Delete</button>
            </div>
            Inside Project
            </>
        )
    }
    return (<>No project info :()</>)

}

export default InsideProject
