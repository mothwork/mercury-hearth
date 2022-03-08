import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getPages } from '../../store/page';
import { useParams } from 'react-router-dom'
import CountryForm from '../TemplateForms/CountryForm'
import PersonForm from '../TemplateForms/PersonForm';
import CityForm from '../TemplateForms/CityForm';
import ContinentForm from '../TemplateForms/ContinentForm';
import RegionForm from '../TemplateForms/RegionForm';


const PageForm = () => {


    const dispatch = useDispatch()

    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const [showCountryForm, setShowCountryForm] = useState(false)
    const [showPersonForm, setShowPersonForm] = useState(false)
    const [showCityForm, setShowCityForm] = useState(false)
    const [showContinentForm, setShowContinentForm] = useState(false)
    const [showRegionForm, setShowRegionForm] = useState(false)
    const [label, setLabel] = useState('Page')

    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])



    const handleCountryClick = ()=> {
        setShowCountryForm(!showCountryForm)
        setLabel('Country')
        setShowPersonForm(false)
        setShowCityForm(false)
        setShowContinentForm(false)
    }

    const handlePersonClick = ()=> {
        setShowPersonForm(!showPersonForm)
        setLabel('Person')
        setShowCountryForm(false)
        setShowCityForm(false)
        setShowContinentForm(false)
    }

    const handleCityClick = ()=> {
        setShowCityForm(!showCityForm)
        setLabel('City')
        setShowCountryForm(false)
        setShowPersonForm(false)
        setShowContinentForm(false)
    }

    const handleContinentClick = () => {
        setShowContinentForm(!showContinentForm)
        setLabel('Continent')
        setShowPersonForm(false)
        setShowCountryForm(false)
        setShowCityForm(false)
    }

    const handleRegionClick = () => {
        setShowRegionForm(!showRegionForm)
        setLabel('Region')
        setShowContinentForm(false)
        setShowPersonForm(false)
        setShowCountryForm(false)
        setShowCityForm(false)
    }


    return (
        <>
            <div className='page-form'>
            <h2 className='modal-label'>{`New ${label}`}</h2>
            <button value='continent'className='template-button' onClick={handleContinentClick}>New Continent</button>
            <button value='country' className='template-button' onClick={handleCountryClick}>New Country</button>
            <button value='city' className='template-button' onClick={handleCityClick}>New City</button>
            <button value='person'className='template-button' onClick={handlePersonClick}>New Person</button>
            <button value='region' className='template-button' onClick={handleRegionClick}>New Region</button>
            {showCountryForm && (<CountryForm/>)}
            {showPersonForm && (<PersonForm/>)}
            {showCityForm && (<CityForm/>)}
            {showContinentForm && (<ContinentForm/>)}
            {showRegionForm && (<RegionForm/>)}
            </div>
        </>
    )
}

export default PageForm
