import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { getCards} from '../../store/card';
import { editCard } from '../../store/card';
import { useParams } from 'react-router-dom';

const CardForm = ({ modalSetter, card }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description)
    // const [image, setImage] = useState(card.imageUrl);
    // const [imageLoading, setImageLoading] = useState(false);
    // const [disableButton, setDisableButton] = useState(false)

    const dispatch = useDispatch()
    // const history = useHistory()
    let { pageId } = useParams()
    const id = card.id

    pageId = parseInt(pageId)


    useEffect(() => {
        dispatch(getCards(pageId))
    }, [dispatch, pageId])



    const handleSubmit = async (e) => {
        e.preventDefault()


        if (!title.length) {
            setErrors(['Project Title Required'])
            return null
        }
        // const formData = new FormData();
        // // formData.append("image", image);
        // formData.set("title", title);
        // formData.set("description", description)
        // formData.set('userId', userId)
        const card = {
            title,
            description,
            pageId,
            id

        }
        await dispatch(editCard(card))
        modalSetter()
        await dispatch(getCards(pageId))

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        // setImageLoading(true);
        // setDisableButton(true)
        // const res = await fetch(`/api/pages/${id}`, {
        //     method: "POST",
        //     body: formData,
        // });
        // if (res.ok) {
        //     await res.json();
        //     setImageLoading(false);
        //     modalSetter()
        //     await dispatch(getCards(pageId))

        // }
        // else {
        //     setImageLoading(false);
        //     // a real app would probably use more advanced
        //     // error handling
        //     console.log("error");
        // }
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    return (
        <>
            <h2 className='modal-label'>Edit Card</h2>
            <p>To change the picture, create a new card.</p>
            <form autoComplete='off' className='auth-form project-form' onSubmit={handleSubmit}>
                <div className='error-box'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
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
                <button className='project-button' onClick={handleSubmit}>Update Card</button>
            </form>
        </>
    )
}

export default CardForm
