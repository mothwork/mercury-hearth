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

const deleteOnePage = page => ({
    type: DELETE_ONE,
    page
})


export const getPages = (projectId) => async (dispatch) => {

    const response = await fetch(`/api/projects/${projectId}/pages`)
    console.log('RESPONSE', response)
    if (response.status === 204) {
        const pageArray = []
        dispatch(load(pageArray))
    }
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
    if (response.ok) {
        dispatch(addOnePage(page))
        return page
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

export const editPage = (pageToEdit) => async (dispatch) => {
    const pageId = pageToEdit.id
    const projectId = pageToEdit.projectId

    const response = await fetch(`/api/projects/${projectId}/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageToEdit)
    })

    const page = await response.json()
    if (response.ok) {
        dispatch(editOnePage(pageToEdit))
        return page
    }
}

const initialState = {}

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case LOAD: {
            // if (!action.pageArray) return state

            const pages = {}
            const pageArray = action.pageArray

            if (pageArray) {

                action.pageArray.forEach(page => {
                    pages[page.id] = page
                })
                return {
                    ...state, pages, pageArray
                }
            }
            return {}
        }
        case DELETE_ONE: {
            const page = action.page
            const id = page.id
            const newState = Object.assign({}, state);
            delete newState[id];
            return newState
        }
        case ADD_ONE: {
            const page = action.page
            const newState = Object.assign({}, state);
            newState[page.id] = page;
            return newState
        }
        case EDIT_ONE: {
            const page = action.page
            const newState = Object.assign({}, state);
            newState[page.id] = page;
            return newState
        }
    }
}

export default pageReducer
