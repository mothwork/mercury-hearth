import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createProject } from '../../store/project';
import { getProjects } from '../../store/project';
import { getCards } from '../../store/card';
import { useParams } from 'react-router-dom';

const CardForm = ({ modalSetter }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const { pageId, projectId } = useParams()
    const id = parseInt(pageId)

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])



    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = user.id
        if (!title.length) {
            setErrors(['Project Title Required'])
            return null
        }
        const formData = new FormData();
        formData.append("image", image);
        formData.set("title", title);
        formData.set("description", description)
        formData.set('userId', userId)


        for (const key of formData.entries()) {
            console.log(key[0], key[1])
        }
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        setDisableButton(true)
        const res = await fetch(`/api/pages/${id}`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            modalSetter()
            await dispatch(getCards(pageId))

        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <>
            <h2 className='modal-label'>New Card</h2>
            <form autoComplete='off' className='auth-form project-form' onSubmit={handleSubmit}>
                <div className='error-box'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />

                {(imageLoading) && <p>Loading...</p>}
                {/* <label>Project Title</label> */}
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={updateTitle}
                    value={title}
                    autoComplete='off'
                ></input>
                {/* <label>Description</label> */}
                <textarea
                    type='textarea'
                    name='description'
                    placeholder='Description'
                    onChange={updateDescription}
                    value={description}
                    autoComplete='off'
                    cols={50}
                    rows={10}
                ></textarea>

                <button disabled={disableButton} className='project-button'>Create Card</button>
            </form>
        </>
    )
}

export default CardForm
