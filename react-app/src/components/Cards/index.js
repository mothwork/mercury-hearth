import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { deleteCard, getCards } from '../../store/card';
import { getProjects } from '../../store/project';
import './Cards.css'
import CardModal from './CardModal';
import CardEditModal from './CardEditModal'

const Cards = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    let { pageId, projectId } = useParams()
    pageId = parseInt(pageId)

    const cards = useSelector(state => state.cards.cardArray)
    const cardObj = useSelector(state => state.cards.cards)

    useEffect(() => {
        dispatch(getProjects())
        dispatch(getCards(pageId))
    }, [dispatch, pageId])

    const handleDelete = async (e) => {
        e.preventDefault()
        const confirmed = window.confirm('This card will be permanently deleted. Are you sure?')
        console.log(e.target)
        const id = parseInt(e.target.title)
        const card = cardObj[id]
        console.log(card)
        if (card && confirmed) {
            await dispatch(deleteCard(cardObj[id]))
            await dispatch(getCards(pageId))
        }



    }




    if (cards && cards.length > 0) {
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
                            <div key={card.id} className='card-container'  >
                                <img className='card-image' alt={card.title} src={card.imageUrl} />
                                <div className='options'>
                                    <CardEditModal card={card}/>

                                    <button className='option-button' title={card.id} onClick={handleDelete}>Delete</button>
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
        <>
        <div className='card-header'>
                    <NavLink to={`/projects/${projectId}/${pageId}`}>
                    <button className='project-button'>Back</button>
                    </NavLink>
                    <CardModal/>
                </div>
                <div className='card-view-container'>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                    <div className='card-placeholder'></div>
                </div>
                </>
    )
}

export default Cards
