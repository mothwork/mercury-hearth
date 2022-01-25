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


    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])

    const [showCountryForm, setShowCountryForm] = useState(false)
    const [showPersonForm, setShowPersonForm] = useState(false)

    const handleCountryClick = ()=> {
        setShowCountryForm(!showCountryForm)
        setShowPersonForm(false)
    }

    const handlePersonClick = ()=> {
        setShowPersonForm(!showPersonForm)
        setShowCountryForm(false)
    }

    return (
        <>
            <div className='page-form'>
            <h2 className='modal-label'>New Page</h2>
            <button value='country' onClick={handleCountryClick}>New Country</button>
            <button value='person' onClick={handlePersonClick}>New Person</button>
            {showCountryForm && (<CountryForm/>)}
            {showPersonForm && (<PersonForm/>)}
            </div>
        </>
    )
}

export default PageForm
