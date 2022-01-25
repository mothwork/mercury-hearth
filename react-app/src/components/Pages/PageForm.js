import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage, getPages } from '../../store/page';
import { useParams } from 'react-router-dom'
import CountryForm from '../TemplateForms/CountryForm'
import PersonForm from '../TemplateForms/PersonForm';

const PageForm = () => {


    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const [showCountryForm, setShowCountryForm] = useState(false)
    const [showPersonForm, setShowPersonForm] = useState(false)
    const [label, setLabel] = useState('Page')

    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])



    const handleCountryClick = ()=> {
        setShowCountryForm(!showCountryForm)
        setLabel('Country')
        setShowPersonForm(false)
    }

    const handlePersonClick = ()=> {
        setShowPersonForm(!showPersonForm)
        setLabel('Person')
        setShowCountryForm(false)
    }



    return (
        <>
            <div className='page-form'>
            <h2 className='modal-label'>{`New ${label}`}</h2>
            <button value='country' className='template-button' onClick={handleCountryClick}>New Country</button>
            <button value='person'className='template-button' onClick={handlePersonClick}>New Person</button>
            {showCountryForm && (<CountryForm/>)}
            {showPersonForm && (<PersonForm/>)}
            </div>
        </>
    )
}

export default PageForm
