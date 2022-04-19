import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PageImageForm from './PageImageForm';

function ImageModal() {
    const [showModal, setShowModal] = useState(false);

    const modalSetter = () => {
        setShowModal(false)
    }
    return (
        <>
            <button className='add-image' onClick={() => setShowModal(true)}> + </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PageImageForm modalSetter={modalSetter} />
                </Modal>
            )}
        </>
    );
}

export default ImageModal;
