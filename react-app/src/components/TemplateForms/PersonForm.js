
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPage } from '../../store/page';
import { useParams } from 'react-router-dom';


const PersonForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const userId = user.id
    const pageType = 'person'
    
    const [title, setTitle] = useState('')
    const [race, setRace] = useState('')
    const [occupation, setOccupation] = useState('')
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

        <form className='project-form new-page-form'>
            <input hidden name='pageType' readOnly value={pageType}></input>
            {/* <label>Title</label> */}
            <input
                placeholder='Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
                required={true}
            ></input>
            {/* <label>Race:</label> */}
            <input
                type='text'
                name='race'
                placeholder='Race'
                onChange={updateRace}
                value={race}
                autoComplete='off'
            ></input>
            {/* <label>Occupation:</label> */}
            <input
                placeholder='Occupation'
                type='text'
                name='occupation'
                onChange={updateOccupation}
                value={occupation}
                autoComplete='off'
            ></input>
            {/* <label>Born:</label> */}
            <input
            placeholder='Born'
                type='text'
                name='born'
                onChange={updateBorn}
                value={born}
                autoComplete='off'
            ></input>
            {/* <label>Died:</label> */}
            <input
                placeholder='Died'
                type='text'
                name='died'
                onChange={updateDied}
                value={died}
                autoComplete='off'
            ></input>
            {/* <label>Residence:</label> */}
            <input
                placeholder='Residence'
                type='text'
                name='residence'
                onChange={updateResidence}
                value={residence}
                autoComplete='off'
            ></input>
            {/* <label>Alias:</label> */}
            <input
                type='text'
                placeholder='Aliases'
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
                cols={20}
                rows={20}
            />
            <button className='template-button' type="submit" onClick={handleSubmit}>Create Person</button>
        </form>
    )
}

export default PersonForm
