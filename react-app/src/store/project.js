const LOAD = 'projects/LOAD'
const ADD_ONE = 'projects/ADD_ONE'



const load = projectArray => ({
    type: LOAD,
    projectArray
})

const addOneProject = project => ({
    type: ADD_ONE,
    project
})


export const getProjects = () => async dispatch => {
    const response = await fetch(`/api/projects/`)

    if (response.ok) {
        const projectArray = await response.json()
        dispatch(load(projectArray))
    }
}

export const createProject = (newProject) => async dispatch => {
    const response = await fetch(`/api/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
    })
    const project = await response.json()
    if (response.ok) dispatch(addOneProject(project))
}


const initialState = {}

const projectReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD: {
            const projects = {}
            const projectArray = action.projectArray
            action.projectArray.forEach( project => {
                projects[project.id] = project
            });
            return {
                ...state, projects, projectArray
            }
        }
        case ADD_ONE: {
            let newState = Object.assign({}, state)
            newState[action.project.id] = action.server
            return newState
        }
    }
}

export default projectReducer
