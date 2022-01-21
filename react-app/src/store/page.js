const LOAD = 'pages/LOAD'
const ADD_ONE = 'pages/ADD_ONE'
const EDIT_ONE = 'pages/EDIT_ONE'
const DELETE_ONE = 'pagess/DELETE_ONE'

const load = pageArray => ({
    type: LOAD,
    pageArray
})

const addOnePage = page => ({
    type: ADD_ONE,
    page
})

const editOnePage = page => ({
    type: EDIT_ONE,
    page
})

const deleteOnePage = page=> ({
    type: DELETE_ONE,
    page
})


export const getPages = (projectId) => async (dispatch) => {

    const response = await fetch(`/api/projects/${projectId}/pages`)
    if (response.ok) {
        const pageArray = await response.json()
        dispatch(load(pageArray))
    }
}

export const createPage = (newPage) => async (dispatch) => {
    const projectId = newPage.projectId
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPage)
    })
    const page = await response.json()
    if (response.ok){
        dispatch(addOnePage(page))
    }
}

export const deletePage = (pageToDelete) => async (dispatch) => {
    const pageId = pageToDelete.id
    const projectId = pageToDelete.projectId
    const response = await fetch(`/api/projects/${projectId}/${pageId}`, {
        method: 'DELETE',
        body: JSON.stringify(pageToDelete)
    })
    const page = await response.json()
    if (response.ok) {
        dispatch(deleteOnePage(pageToDelete))
    }
}

const initialState = {}

const pageReducer = (state=initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD: {
            const pages = {}
            const pageArray = action.pageArray
            console.log(action.pageArray)
            action.pageArray.forEach(page => {
                pages[page.id] = page
            })
            return {
                ...state, pages, pageArray
            }
        }
        case DELETE_ONE: {
            const page = action.page
            const id = page.id
            const newState = Object.assign({}, state);
            delete newState[id];
            return newState
        }
    }
}

export default pageReducer
