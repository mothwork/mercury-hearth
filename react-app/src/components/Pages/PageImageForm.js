import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getPages } from '../../store/page';

const PageImageForm = ({ modalSetter }) => {
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const { pageId } = useParams()
    const id = parseInt(pageId)
    const page = useSelector(state => state.pages.pages[id])
    const projectId = page.projectId


    useEffect(() => {

    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = user.id

        const formData = new FormData();
        formData.append("image", image);
        formData.set('userId', userId)

        setImageLoading(true);
        setDisableButton(true)
        //
        const res = await fetch(`/api/pages/${id}`, {
            method: "PATCH",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            modalSetter()
            await dispatch(getPages(projectId)) //TODO see what we need to do


        }
        else {
            setImageLoading(false);
        }
    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <>

            <form autoComplete='off' className='auth-form project-form' onSubmit={handleSubmit}>
                <h2>Change cover photo</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />

                <div className='error-box'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                {(imageLoading) && <p>Loading...</p>}
                {/* <label>Project Title</label> */}


                <button disabled={disableButton} className='project-button'>Upload Image</button>
            </form>
        </>
    )
}

export default PageImageForm
