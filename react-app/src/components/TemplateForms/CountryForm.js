
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage, getPages } from '../../store/page';
import { useParams } from 'react-router-dom';


const CountryForm = ({}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const userId = user.id

    const [pageType, setPageType] = useState('country')
    const [title, setTitle] = useState('Test')
    const [capital, setCapital] = useState('')
    const [region, setRegion] = useState('')
    const [government, setGovernment] = useState('')
    const [population, setPopulation] = useState('')
    const [religions, setReligions] = useState('')
    const [imports, setImports] = useState('')
    const [exports, setExports] = useState('')
    const [content, setContent] = useState('')



    const handleSubmit = async e => {
        e.preventDefault()
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

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    return (

        <form>
            <input hidden name='pageType' value={pageType}></input>
            <label>Title</label>
            <input
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
            ></input>
            <label>Capital:</label>
            <input
                type='text'
                name='capital'
                onChange={updateCapital}
                value={capital}
                autoComplete='off'
            ></input>
            <label>Region:</label>
            <input
                type='text'
                name='region'
                onChange={updateRegion}
                value={region}
                autoComplete='off'
            ></input>
            <label>Government Type:</label>
            <input
                type='text'
                name='governtment'
                onChange={updateGovernment}
                value={government}
                autoComplete='off'
            ></input>
            <label>Population:</label>
            <input
                type='text'
                name='population'
                onChange={updatePopulation}
                value={population}
                autoComplete='off'
            ></input>
            <label>Religions:</label>
            <input
                type='text'
                name='religions'
                onChange={updateReligions}
                value={religions}
                autoComplete='off'
            ></input>
            <label>Imports:</label>
            <input
                type='text'
                name='imports'
                onChange={updateImports}
                value={imports}
                autoComplete='off'
            ></input>
            <label>Exports:</label>
            <input
                type='text'
                name='exports'
                onChange={updateExports}
                value={exports}
                autoComplete='off'
            ></input>
            <textarea
                type='text'
                name='content'
                onChange={updateContent}
                value={content}
                autoComplete='off'
            />
            <button type="submit" onClick={handleSubmit}>Create Country</button>
        </form>
    )
}

export default CountryForm
