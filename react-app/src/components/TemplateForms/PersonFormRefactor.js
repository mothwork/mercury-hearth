
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editPage, createPage } from '../../store/page';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PersonForm = ({person, page, action}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    let { projectId } = useParams()
    projectId = parseInt(projectId)
    const userId = user.id

    if (!person) {
        person = {
            race: "",
            occupation: "",
            born: "",
            died: "",
            residence: "",
            alias: "",
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
    const [race, setRace] = useState(person.race)
    const [occupation, setOccupation] = useState(person.occupation)
    const [born, setBorn] = useState(person.born)
    const [died, setDied] = useState(person.died)
    const [residence, setResidence] = useState(person.residence)
    const [alias, setlias] = useState(person.alias)
    const [content, setContent] = useState(person.content)

    const pageType = 'person'
    const id = page.id


    const handleSubmit = async e => {
        e.preventDefault()
        if (!title.length) {
            setErrors(['Name Required'])
            return null
        }

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

        if (action === 'Edit') {
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
            <input hidden name='pageType' readOnly value={pageType}></input>
            <label>Name</label>
            <input
                placeholder='Name'
                type='text'
                name='title'
                onChange={updateTitle}
                value={title}
                autoComplete='off'
                required={true}
            ></input>
            <label>Race</label>
            <input
                type='text'
                name='race'
                placeholder='Race'
                onChange={updateRace}
                value={race}
                autoComplete='off'
            ></input>
            <label>Occupation:</label>
            <input
                placeholder='Occupation'
                type='text'
                name='occupation'
                onChange={updateOccupation}
                value={occupation}
                autoComplete='off'
            ></input>
            <label>Born</label>
            <input
            placeholder='Born'
                type='text'
                name='born'
                onChange={updateBorn}
                value={born}
                autoComplete='off'
            ></input>
            <label>Died</label>
            <input
                placeholder='Died'
                type='text'
                name='died'
                onChange={updateDied}
                value={died}
                autoComplete='off'
            ></input>
            <label>Residence</label>
            <input
                placeholder='Residence'
                type='text'
                name='residence'
                onChange={updateResidence}
                value={residence}
                autoComplete='off'
            ></input>
            <label>Alias</label>
            <input
                type='text'
                placeholder='Aliases'
                name='alias'
                onChange={updateAlias}
                value={alias}
                autoComplete='off'
            ></input>
            <div className='quilltainer'>
            <ReactQuill theme='snow' value={content} onChange={setContent}/>
            </div>
            <button className='template-button' type="submit" onClick={handleSubmit}>{action} Person</button>
        </form>
    )
}

export default PersonForm
