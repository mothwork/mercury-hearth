const LOAD = 'cards/LOAD'
const ADD_ONE = 'cards/ADD_ONE'
const EDIT_ONE = 'cards/EDIT_ONE'
const DELETE_ONE = 'cards/DELETE_ONE'

const load = cardArray => ({
    type: LOAD,
    cardArray
})

const addOneCard = card => ({
    type: ADD_ONE,
    card
})

const editOneCard = card => ({
    type: EDIT_ONE,
    card
})

const deleteOneCard = card => ({
    type: DELETE_ONE,
    card
})


export const getCards = (pageId) => async (dispatch) => {

    const response = await fetch(`/api/pages/${pageId}`)

    if (response.status === 204) {
        const cardArray = []
        dispatch(load(cardArray))
    }
    else if (response.ok) {
        const cardArray = await response.json()
        dispatch(load(cardArray))
    }
}

export const createCard = (newCard) => async (dispatch) => {
    const pageId = newCard.pageId
    const response = await fetch(`/api/pages/${pageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard)
    })
    const card = await response.json()
    if (response.ok) {
        dispatch(addOneCard(card))
        return card
    }

}

export const deleteCard = (cardToDelete) => async (dispatch) => {
    const cardId = cardToDelete.id
    const pageId = cardToDelete.pageId
    const response = await fetch(`/api/pages/${pageId}/${cardId}`, {
        method: 'DELETE',
        body: JSON.stringify(cardToDelete)
    })
    // const card = await response.json()
    if (response.ok) {
        dispatch(deleteOneCard(cardToDelete))
    }
}

export const editCard = (cardToEdit) => async (dispatch) => {
    const cardId = cardToEdit.id
    const pageId = cardToEdit.pageId

    const response = await fetch(`/api/pages/${pageId}/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardToEdit)
    })

    const card = await response.json()
    if (response.ok) {
        dispatch(editOneCard(cardToEdit))
        return card
    }
}

const initialState = {}

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case LOAD: {
            // if (!action.cardArray) return state

            const cards = {}
            const cardArray = action.cardArray

            if (cardArray) {

                action.cardArray.forEach(card => {
                    cards[card.id] = card
                })
                return {
                    ...state, cards, cardArray
                }
            }
            return {}
        }
        case DELETE_ONE: {
            const card = action.card
            const id = card.id
            const newState = Object.assign({}, state);
            delete newState[id];
            return newState
        }
        case ADD_ONE: {
            const card = action.card
            const newState = Object.assign({}, state);
            newState[card.id] = card;
            return newState
        }
        case EDIT_ONE: {
            const card = action.card
            const newState = Object.assign({}, state);
            newState[card.id] = card;
            return newState
        }
    }
}

export default cardReducer
