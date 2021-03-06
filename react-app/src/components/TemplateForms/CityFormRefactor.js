
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage, editPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CityForm = ({city, page, action}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()

    const userId = user.id
    projectId = parseInt(projectId)

    if (!city) {
        city = {

            cityType: "",
            region: "",
            government: "",
            population: "",
            religions: "",
            imports: "",
            exports: "",
            content: ""
        }
    }

    if (!page) {
        page = {
            title: ''
        }
    }


    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(page.title)
    const [cityType, setCityType] = useState(city.cityType)
    const [region, setRegion] = useState(city.region)
    const [government, setGovernment] = useState(city.government)
    const [population, setPopulation] = useState(city.population)
    const [religions, setReligions] = useState(city.religions)
    const [imports, setImports] = useState(city.imports)
    const [exports, setExports] = useState(city.exports)
    const [content, setContent] = useState(city.content)

    const pageType = 'city'
    const id = page.id

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

        if (action === 'edit'){
            const page = {
                id,
                title,
                userId,
                projectId,
            }
            page.content = JSON.stringify(pageContent)
            const newPage = await dispatch(editPage(page))
            history.push(`/projects/${newPage.projectId}/${newPage.id}`)

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
            <label>City Name</label>
            <input
                required={true}
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
            ></input>
            <label>Capital</label>
            <input

                type='text'
                name='capital'
                onChange={updateCityType}
                value={cityType}
                autoComplete='off'
            ></input>
            <label>Region</label>
            <input

                type='text'
                name='region'
                onChange={updateRegion}
                value={region}
                autoComplete='off'
            ></input>
            <label>Government Type</label>
            <input

                type='text'
                name='governtment'
                onChange={updateGovernment}
                value={government}
                autoComplete='off'
            ></input>
            <label>Population</label>
            <input

                type='text'
                name='population'
                onChange={updatePopulation}
                value={population}
                autoComplete='off'
            ></input>
            <label>Religions</label>
            <input

                type='text'
                name='religions'
                onChange={updateReligions}
                value={religions}
                autoComplete='off'
            ></input>
            <label>Imports</label>
            <input

                type='text'
                name='imports'
                onChange={updateImports}
                value={imports}
                autoComplete='off'
            ></input>
            <label>Exports</label>
            <input
        
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
            <button className='template-button' type="submit" onClick={handleSubmit}>{action} City</button>
        </form>
    )
}

export default CityForm
