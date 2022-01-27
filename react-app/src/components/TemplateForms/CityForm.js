
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'


const CityForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()

    const userId = user.id
    projectId = parseInt(projectId)
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState('')
    const [cityType, setCityType] = useState('')
    const [region, setRegion] = useState('')
    const [government, setGovernment] = useState('')
    const [population, setPopulation] = useState('')
    const [religions, setReligions] = useState('')
    const [imports, setImports] = useState('')
    const [exports, setExports] = useState('')
    const [content, setContent] = useState('')

    const pageType = 'city'


    const handleSubmit = async e => {
        e.preventDefault()
        if (!title.length) {
            setErrors(['City Name Required'])
            return null
        }
        const pageContent = {
            pageType,
            cityType,
            region,
            government,
            population,
            religions,
            imports,
            exports,
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

    const updateCityType = (e) => {
        setCityType(e.target.value)
    }

    const updateRegion = (e) => {
        setRegion(e.target.value)
    }

    const updateGovernment = (e) => {
        setGovernment(e.target.value)
    }

    const updatePopulation = (e) => {
        setPopulation(e.target.value)
    }

    const updateReligions = (e) => {
        setReligions(e.target.value)
    }

    const updateImports = (e) => {
        setImports(e.target.value)
    }

    const updateExports = (e) => {
        setExports(e.target.value)
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    return (

        <form className='project-form new-page-form'>
            <div className='error-box'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <input hidden name='pageType' value={pageType}></input>
            {/* <label>CCity Details:</label> */}
            <input
                required={true}

                placeholder='City Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
            ></input>
            {/* <label>Capital:</label> */}
            <input
            placeholder='City Type'
                type='text'
                name='capital'
                onChange={updateCityType}
                value={cityType}
                autoComplete='off'
            ></input>
            {/* <label>Region:</label> */}
            <input
                placeholder='Region'
                type='text'
                name='region'
                onChange={updateRegion}
                value={region}
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
            <textarea
                type='text'
                name='content'
                onChange={updateContent}
                value={content}
                autoComplete='off'
                cols={20}
                rows={20}
            />
            <button className='template-button' type="submit" onClick={handleSubmit}>Create City</button>
        </form>
    )
}

export default CityForm