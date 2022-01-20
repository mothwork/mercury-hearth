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
    }
}

export default pageReducer
