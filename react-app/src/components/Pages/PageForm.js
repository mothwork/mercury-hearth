import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getPages } from '../../store/page';
import { useParams } from 'react-router-dom'

import CountryForm from '../TemplateForms/CountryFormRefactor';
import PersonForm from '../TemplateForms/PersonFormRefactor';
import CityForm from '../TemplateForms/CityFormRefactor';
import ContinentForm from '../TemplateForms/ContinentFormRefactor';
import RegionForm from '../TemplateForms/RegionFromRefactor';
import ObjectForm from '../TemplateForms/ObjectFormRefactor';


const PageForm = () => {


    const dispatch = useDispatch()

    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const [showCountryForm, setShowCountryForm] = useState(false)
    const [showPersonForm, setShowPersonForm] = useState(false)
    const [showCityForm, setShowCityForm] = useState(false)
    const [showContinentForm, setShowContinentForm] = useState(false)
    const [showRegionForm, setShowRegionForm] = useState(false)
    const [showObjectForm, setShowObjectForm] = useState(false)
    const [label, setLabel] = useState('Page')

    useEffect(() => {
        dispatch(getPages(projectId))
    }, [dispatch, projectId])



    const handleCountryClick = () => {
        setShowCountryForm(!showCountryForm)
        setLabel('Country')
        setShowRegionForm(false)
        setShowPersonForm(false)
        setShowCityForm(false)
        setShowContinentForm(false)
        setShowObjectForm(false)
    }

    const handlePersonClick = () => {
        setShowPersonForm(!showPersonForm)
        setLabel('Person')
        setShowCountryForm(false)
        setShowCityForm(false)
        setShowContinentForm(false)
        setShowRegionForm(false)
        setShowObjectForm(false)
    }

    const handleCityClick = () => {
        setShowCityForm(!showCityForm)
        setLabel('City')
        setShowCountryForm(false)
        setShowPersonForm(false)
        setShowContinentForm(false)
        setShowRegionForm(false)
        setShowObjectForm(false)

    }

    const handleContinentClick = () => {
        setShowContinentForm(!showContinentForm)
        setLabel('Continent')
        setShowRegionForm(false)
        setShowPersonForm(false)
        setShowCountryForm(false)
        setShowCityForm(false)
        setShowObjectForm(false)
        setShowObjectForm(false)
    }

    const handleRegionClick = () => {
        setShowRegionForm(!showRegionForm)
        setLabel('Region')
        setShowContinentForm(false)
        setShowPersonForm(false)
        setShowCountryForm(false)
        setShowCityForm(false)
        setShowObjectForm(false)
    }

    const handleObjectClick = () => {
        setShowObjectForm(!showObjectForm)
        setLabel('Object')
        setShowRegionForm(false)
        setShowContinentForm(false)
        setShowPersonForm(false)
        setShowCountryForm(false)
        setShowCityForm(false)
    }


    return (
        <>
            <div className='page-form'>
                <h2 className='modal-label'>{`New ${label}`}</h2>
                <button value='continent' className='template-button' onClick={handleContinentClick}>New Continent</button>
                <button value='region' className='template-button' onClick={handleRegionClick}>New Region</button>
                <button value='country' className='template-button' onClick={handleCountryClick}>New Country</button>
                <button value='city' className='template-button' onClick={handleCityClick}>New City</button>
                <button value='person' className='template-button' onClick={handlePersonClick}>New Person</button>
                <button value='object' className='template-button' onClick={handleObjectClick}>New Object</button>

                {showCountryForm && (<CountryForm page={null} country={null} action='New' />)}
                {showPersonForm && (<PersonForm page={null} country={null} action='New' />)}
                {showCityForm && (<CityForm page={null} country={null} action={'New'} />)}
                {showContinentForm && (<ContinentForm page={null} country={null} action='New' />)}
                {showRegionForm && (<RegionForm page={null} country={null} action='New' />)}
                {showObjectForm && (<ObjectForm page={null} object={null} action='New' />)}
            </div>
        </>
    )
}

export default PageForm
