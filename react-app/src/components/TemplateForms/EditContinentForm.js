
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import './CountryForm.css'


const EditContinentForm = ({continent, page}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()

    const userId = user.id
    projectId = parseInt(projectId)
    const id = page.id

    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(page.title)
    const [overview, setOverview] = useState(continent.overview)
    const [geographyAndEcology, setGeographyAndEcology] = useState(continent.geographyAndEcology)
    const [countries, setCountries] = useState(continent.countries)
    const [peoples, setPeoples] = useState(continent.peoples)
    const [culture, setCulture] = useState(continent.culture)
    const [trade, setTrade] = useState(continent.trade)
    const [content, setContent] = useState(continent.content)

    const pageType = 'continent'


    const handleSubmit = async e => {
        e.preventDefault()
        if (!title.length) {
            setErrors(['Continent Name Required'])
            return null
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
            id,
            title,
            userId,
            projectId,
        }
        page.content = JSON.stringify(pageContent)
        const newPage = await dispatch(editPage(page))
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
            <div className='error-box'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <input hidden name='pageType' value={pageType}></input>
            <label>Continent Name</label>
            <input
                required
                placeholder='Continent Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
            ></input>
            <label>Overview</label>
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
            <label>Geography and Ecology</label>
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
            <label>Countries</label>
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
            <label>Peoples</label>
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
            <label>Cultures</label>
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
            <label>Trade</label>
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
            <button className='template-button' type="submit" onClick={handleSubmit}>Edit Continent</button>
        </form>
    )
}

export default EditContinentForm
