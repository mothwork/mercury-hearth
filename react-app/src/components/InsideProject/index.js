import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getProjects } from "../../store/project";
import EditProjectModal from "../Projects/EditProjectModal";




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
    const handleEdit = async () => {

    }
    const handleDelete = async () => {

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
                <EditProjectModal/>
                <button className='project-button'>Edit</button>
                <button className='project-button'>Delete</button>
                <p>{project.description}</p>
            </div>
            Inside Project
            </>
        )
    }
    return (<>No project info :()</>)

}

export default InsideProject
