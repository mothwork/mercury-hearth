
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editPage, getPages, createPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const CountryForm = ({ country, page, action }) => {


    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    const userId = user.id
    projectId = parseInt(projectId)

    // If it is a new page create the page and country objects
    if (!page) {
        page = {
            title: ""
        }

    }

    if (!country) {
        country = {
            capital: '',
            region: '',
            government: '',
            population: '',
            religions: '',
            imports: '',
            exports: '',
            content: '',
        }
    }

    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(page.title)
    const [capital, setCapital] = useState(country.capital)
    const [region, setRegion] = useState(country.region)
    const [government, setGovernment] = useState(country.government)
    const [population, setPopulation] = useState(country.population)
    const [religions, setReligions] = useState(country.religions)
    const [imports, setImports] = useState(country.imports)
    const [exports, setExports] = useState(country.exports)
    const [content, setContent] = useState(country.content)

    const pageType = 'country'
    const id = page.id

    const handleSubmit = async e => {
        e.preventDefault()

        if (!title.length) {
            setErrors(['Country Name Required'])
            return null
        }

        const pageContent = {
            pageType,
            capital,
            region,
            government,
            population,
            religions,
            imports,
            exports,
            content
        }

        if (action === 'edit') {
            //Edit Page
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
            //New Page
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

    const updateCapital = (e) => {
        setCapital(e.target.value)
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
            <div>
                <div className='error-box'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <input hidden name='pageType' value={pageType}></input>
                {/* <label>Country Name</label> */}
                <input
                    placeholder='Country Name'
                    type='text'
                    name='title'
                    onChange={updateTitle}
                    value={title}
                    required
                    autoComplete='off'
                ></input>
                {/* <label>Capital</label> */}
                <input
                    placeholder='Capital'
                    type='text'
                    name='capital'
                    onChange={updateCapital}
                    value={capital}
                    autoComplete='off'
                ></input>
                {/* <label>Region</label> */}
                <input
                    placeholder='Region'
                    type='text'
                    name='region'
                    onChange={updateRegion}
                    value={region}
                    autoComplete='off'
                ></input>
                {/* <label>Government Type</label> */}
                <input
                    placeholder='Government Type'
                    type='text'
                    name='governtment'
                    onChange={updateGovernment}
                    value={government}
                    autoComplete='off'
                ></input>
                {/* <label>Population</label> */}
                <input
                    placeholder='Population'
                    type='text'
                    name='population'
                    onChange={updatePopulation}
                    value={population}
                    autoComplete='off'
                ></input>
                {/* <label>Religions</label> */}
                <input
                    placeholder='Religions'
                    type='text'
                    name='religions'
                    onChange={updateReligions}
                    value={religions}
                    autoComplete='off'
                ></input>
                {/* <label>Imports</label> */}
                <input
                    placeholder='Imports'
                    type='text'
                    name='imports'
                    onChange={updateImports}
                    value={imports}
                    autoComplete='off'
                ></input>
                {/* <label>Exports</label> */}
                <input
                    placeholder='Exports'
                    type='text'
                    name='exports'
                    onChange={updateExports}
                    value={exports}
                    autoComplete='off'
                ></input>
            <button className='template-button' type="submit" onClick={handleSubmit}>{action} Country</button>
            </div>
            <div>
            {/* <label>Main Content</label> */}
            <div className='quilltainer'>
                <ReactQuill theme='snow' value={content} onChange={setContent} />
            </div>
            </div>
        </form>
    )
}

export default CountryForm
