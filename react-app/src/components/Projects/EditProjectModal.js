import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProjectForm from './EditProjectForm'

function EditProjectModal() {
    const [showModal, setShowModal] = useState(false);

    const modalSetter = () => {
        setShowModal(false)
    }
    return (
        <>
            <button className='project-button' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProjectForm modalSetter={modalSetter} />
                </Modal>
            )}
        </>
    );
}

export default EditProjectModal;
