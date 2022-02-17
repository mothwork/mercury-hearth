import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getCards } from '../../store/card';
import { getProjects } from '../../store/project';
import './Cards.css'
import CardModal from './CardModal';

const Cards = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    let { pageId, projectId } = useParams()
    pageId = parseInt(pageId)

    const cards = useSelector(state => state.cards.cardArray)

    useEffect(() => {
        dispatch(getProjects())
        dispatch(getCards(pageId))
    }, [dispatch, pageId])

    const handleClick = (e) => {
        e.preventDefault()
        
    }

    console.log('CARDS CARDS CARDS', cards)

    if (cards) {
        return (
            <>
                <div className='card-header'>
                    <NavLink to={`/projects/${projectId}/${pageId}`}>
                    <button className='project-button'>Back</button>
                    </NavLink>
                    <CardModal/>
                </div>
                <div className='card-view-container'>

                    {cards.map(card => {
                        return (
                            <div key={card.id} className='card-container' onClick={handleClick} >
                                <img className='card-image' alt={card.title} src={card.imageUrl} />
                                <div className='options'>
                                    <button className='option-button'>Edit</button>
                                    <button className='option-button'>Delete</button>
                                </div>
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
