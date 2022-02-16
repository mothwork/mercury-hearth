import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getCards } from '../../store/card';
import './Cards.css'

const Cards = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    let { pageId } = useParams()
    pageId = parseInt(pageId)

    const cards = useSelector(state => state.cards.cardArray)

    useEffect(() => {
        dispatch(getCards(pageId))
    }, [dispatch, pageId])

    console.log('CARDS CARDS CARDS', cards)

    if (cards) {
        return (
            <>
                <div className='card-view-container'>

                    {cards.map(card => {
                        return (
                            <div className='card-container' >
                                <img alt={card.title} src={card.imageUrl} />
                                <div className='card-description'>
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    return (
        'No cards?'
    )
}

export default Cards