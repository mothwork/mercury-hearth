
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage, getPages } from '../../store/page';
import { useParams } from 'react-router-dom';


const PersonForm = ({}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const userId = user.id

    const [pageType, setPageType] = useState('person')
    const [title, setTitle] = useState('')
    const [race, setRace] = useState('')
    const [occupation, setOccupation] = useState('')
    const [government, setGovernment] = useState('')
    const [born, setBorn] = useState('')
    const [died, setDied] = useState('')
    const [residence, setResidence] = useState('')
    const [alias, setlias] = useState('')
    const [content, setContent] = useState('')



    const handleSubmit = async e => {
        e.preventDefault()
        const pageContent = {
            pageType,
            race,
            occupation,
            born,
            died,
            residence,
            alias,
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

    const updateRace = (e) => {
        setRace(e.target.value)
    }

    const updateOccupation = (e) => {
        setOccupation(e.target.value)
    }

    const updateBorn = (e) => {
        setBorn(e.target.value)
    }

    const updateDied = (e) => {
        setDied(e.target.value)
    }

    const updateResidence = (e) => {
        setResidence(e.target.value)
    }

    const updateAlias = (e) => {
        setlias(e.target.value)
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    return (

        <form>
            <input hidden name='pageType' readOnly value={pageType}></input>
            <label>Title</label>
            <input
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
                required={true}
            ></input>
            <label>Race:</label>
            <input
                type='text'
                name='race'
                onChange={updateRace}
                value={race}
                autoComplete='off'
            ></input>
            <label>Occupation:</label>
            <input
                type='text'
                name='occupation'
                onChange={updateOccupation}
                value={occupation}
                autoComplete='off'
            ></input>
            <label>Born:</label>
            <input
                type='text'
                name='born'
                onChange={updateBorn}
                value={born}
                autoComplete='off'
            ></input>
            <label>Died:</label>
            <input
                type='text'
                name='died'
                onChange={updateDied}
                value={died}
                autoComplete='off'
            ></input>
            <label>Residence:</label>
            <input
                type='text'
                name='residence'
                onChange={updateResidence}
                value={residence}
                autoComplete='off'
            ></input>
            <label>Alias:</label>
            <input
                type='text'
                name='alias'
                onChange={updateAlias}
                value={alias}
                autoComplete='off'
            ></input>
            <textarea
                type='text'
                name='content'
                onChange={updateContent}
                value={content}
                autoComplete='off'
            />
            <button type="submit" onClick={handleSubmit}>Create Person</button>
        </form>
    )
}

export default PersonForm
