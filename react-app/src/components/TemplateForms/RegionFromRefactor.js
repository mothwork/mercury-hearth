
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPage, editPage, getPages } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const RegionForm = ({region, page, action}) => {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    let { projectId } = useParams();
    const userId = user.id;
    projectId = parseInt(projectId);


    if (!region) {
        region = {
            location: "",
            geoType: "",
            weather: "",
            civType: "",
            travelSafety: "",
            government: "",
            popCenters: "",
            content: ""
        }
    }

    if (!page) {
        page = {
            title: '',
        }
    }


    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(page.title)
    const [location, setLocation] = useState(region.location)
    const [geoType, setGeoType] = useState(region.geoType)
    const [weather, setWeather] = useState(region.weather)
    const [civType, setCivType] = useState(region.civType)
    const [travelSafety, setTravelSafety] = useState(region.travelSafety)
    const [government, setGovernment] = useState(region.government)
    const [popCenters, setPopCenters] = useState(region.popCenters)
    const [content, setContent] = useState(region.content)

    const pageType = 'region'
    const id = page.id

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
        if (action === 'Edit') {
            const page = {
                id,
                title,
                userId,
                projectId,
            }

            page.content = JSON.stringify(pageContent)
            const editedPage = await dispatch(editPage(page))
            await dispatch(getPages(projectId))
            history.push(`/projects/${editedPage.projectId}/${editedPage.id}`)

        } else {
            const page = {
                title,
                userId,
                projectId,
            }
            page.content = JSON.stringify(pageContent)
            const newPage = await dispatch(createPage(page))
            history.push(`/projects/${newPage.projectId}/${newPage.id}`)
        }


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
            <label>Region Name:</label>
            <input
                placeholder='Region Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                required
                autoComplete='off'
            ></input>
            <label>Location:</label>
            <input
                placeholder='Location'
                type='text'
                name='location'
                onChange={updateLocation}
                value={location}
                autoComplete='off'
            ></input>
            <label>Geography Types:</label>
            <input
                placeholder='Geography Types'
                type='text'
                name='geoTypes'
                onChange={updateGeoType}
                value={geoType}
                autoComplete='off'
            ></input>
            <label>Weather:</label>
            <input
                placeholder='Weather'
                type='text'
                name='weather'
                onChange={updateWeather}
                value={weather}
                autoComplete='off'
            ></input>
            <label>Civilization Types:</label>
            <input
                placeholder='Civilization Types'
                type='text'
                name='civTypes'
                onChange={updateCivType}
                value={civType}
                autoComplete='off'
            ></input>
            <label>Travel Safety:</label>
            <input
                placeholder='Travel Safety'
                type='text'
                name='travelSafety'
                onChange={updateTravelSafety}
                value={travelSafety}
                autoComplete='off'
            ></input>
            <label>Government:</label>
            <input
                placeholder='Government'
                type='text'
                name='imports'
                onChange={updateGovernment}
                value={government}
                autoComplete='off'
            ></input>
            <label>Population Centers:</label>
            <input
                placeholder='Population Centers'
                type='text'
                name='popCenters'
                onChange={updatePopCenters}
                value={popCenters}
                autoComplete='off'
            ></input>
            <label>Main Content</label>
            <div className='quilltainer'>
            <ReactQuill theme='snow' value={content} onChange={setContent}/>
            </div>

            <button className='template-button' type="submit" onClick={handleSubmit}>{action} Region</button>
        </form>
    )
}

export default RegionForm
