
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'


const ContinentForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()

    const userId = user.id
    projectId = parseInt(projectId)

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [geographyAndEcology, setGeographyAndEcology] = useState('')
    const [countries, setCountries] = useState('')
    const [peoples, setPeoples] = useState('')
    const [culture, setCulture] = useState('')
    const [trade, setTrade] = useState('')
    const [content, setContent] = useState('')

    const pageType = 'continent'


    const handleSubmit = async e => {
        e.preventDefault()
        if (!title.length) {

        }
        const pageContent = {
            pageType,
            overview,
            geographyAndEcology,
            countries,
            peoples,
            culture,
            trade,
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

    const updateOverview = (e) => {
        setOverview(e.target.value)
    }

    const updateGeo = (e) => {
        setGeographyAndEcology(e.target.value)
    }

    const updateCountries = (e) => {
        setCountries(e.target.value)
    }

    const updatePeoples = (e) => {
        setPeoples(e.target.value)
    }

    const updateCulture = (e) => {
        setCulture(e.target.value)
    }

    const updateTrade = (e) => {
        setTrade(e.target.value)
    }


    const updateContent = (e) => {
        setContent(e.target.value)
    }

    return (

        <form className='project-form new-page-form'>
            <input hidden name='pageType' value={pageType}></input>
            {/* <label>CCity Details:</label> */}
            <input
                required
                placeholder='Continent Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
            ></input>
            <textarea
                type='text'
                placeholder='Overview'
                name='overview'
                onChange={updateOverview}
                value={overview}
                autoComplete='off'
                cols={20}
                rows={10}
            />
            <textarea
                type='text'
                placeholder='Geography and Ecology'
                name='geo'
                onChange={updateGeo}
                value={geographyAndEcology}
                autoComplete='off'
                cols={20}
                rows={5}
            />
            <textarea
                type='text'
                placeholder='Countries'
                name='countries'
                onChange={updateCountries}
                value={countries}
                autoComplete='off'
                cols={20}
                rows={5}
            />
            <textarea
                type='text'
                placeholder='Peoples'
                name='peoples'
                onChange={updatePeoples}
                value={peoples}
                autoComplete='off'
                cols={20}
                rows={5}
            />
            <textarea
                type='text'
                placeholder='Cultures'
                name='cultures'
                onChange={updateCulture}
                value={culture}
                autoComplete='off'
                cols={20}
                rows={5}
            />
            <textarea
                type='text'
                placeholder='Trade'
                name='trade'
                onChange={updateTrade}
                value={trade}
                autoComplete='off'
                cols={20}
                rows={5}
            />
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
            <button className='template-button' type="submit" onClick={handleSubmit}>Create Continent</button>
        </form>
    )
}

export default ContinentForm
