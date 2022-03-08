
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const RegionForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    const userId = user.id
    projectId = parseInt(projectId)
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [geoType, setGeoType] = useState('')
    const [weather, setWeather] = useState('')
    const [civType, setCivType] = useState('')
    const [travelSafety, setTravelSafety] = useState('')
    const [government, setGovernment] = useState('')
    const [popCenters, setPopCenters] = useState('')
    const [content, setContent] = useState('')

    const pageType = 'region'


    const handleSubmit = async e => {
        e.preventDefault()
        if (!title.length) {
            setErrors(['Region Name Required'])
            return null
        }
        const pageContent = {
            pageType,
            location,
            geoType,
            weather,
            civType,
            travelSafety,
            government,
            popCenters,
            content
        }
        const page = {
            title,
            userId,
            projectId,
        }
        page.content = JSON.stringify(pageContent)
        const newPage = await dispatch(createPage(page))
        history.push(`/projects/${newPage.projectId}/${newPage.id}`)

    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateLocation = (e) => {
        setLocation(e.target.value)
    }

    const updateGeoType = (e) => {
        setGeoType(e.target.value)
    }

    const updateWeather = (e) => {
        setWeather(e.target.value)
    }

    const updateCivType = (e) => {
        setCivType(e.target.value)
    }

    const updateTravelSafety = (e) => {
        setTravelSafety(e.target.value)
    }

    const updateGovernment = (e) => {
        setGovernment(e.target.value)
    }

    const updatePopCenters = (e) => {
        setPopCenters(e.target.value)
    }

    // const updateContent = (e) => {
    //     setContent(e.target.value)
    // }

    return (

        <form className='project-form new-page-form'>
            <div className='error-box'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <input hidden name='pageType' value={pageType}></input>
            {/* <label>Country Details:</label> */}
            <input
                placeholder='Country Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                required
                autoComplete='off'
            ></input>
            {/* <label>Location:</label> */}
            <input
                placeholder='Location'
                type='text'
                name='Location'
                onChange={updateLocation}
                value={Location}
                autoComplete='off'
            ></input>
            {/* <label>Region:</label> */}
            <input
                placeholder='Geography Types'
                type='text'
                name='geoTypes'
                onChange={updateGeoType}
                value={geoType}
                autoComplete='off'
            ></input>
            {/* <label>Government Type:</label> */}
            <input
                placeholder='Government Type'
                type='text'
                name='governtment'
                onChange={updateGovernment}
                value={government}
                autoComplete='off'
            ></input>
            {/* <label>Population:</label> */}
            <input
                placeholder='Population'
                type='text'
                name='population'
                onChange={updatePopulation}
                value={population}
                autoComplete='off'
            ></input>
            {/* <label>Religions:</label> */}
            <input
                placeholder='Religions'
                type='text'
                name='religions'
                onChange={updateReligions}
                value={religions}
                autoComplete='off'
            ></input>
            {/* <label>Imports:</label> */}
            <input
                placeholder='Imports'
                type='text'
                name='imports'
                onChange={updateImports}
                value={imports}
                autoComplete='off'
            ></input>
            {/* <label>Exports:</label> */}
            <input
                placeholder='Exports'
                type='text'
                name='exports'
                onChange={updateExports}
                value={exports}
                autoComplete='off'
            ></input>
            <label>Main Content</label>
            <div className='quilltainer'>
            <ReactQuill theme='snow' value={content} onChange={setContent}/>
            </div>

            <button className='template-button' type="submit" onClick={handleSubmit}>Create Region</button>
        </form>
    )
}

export default RegionForm
