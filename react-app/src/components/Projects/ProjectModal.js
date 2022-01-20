import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProjectForm from './ProjectForm'

function ProjectModal() {
    const [showModal, setShowModal] = useState(false);

    const modalSetter = () => {
        setShowModal(false)
    }
    return (
        <>
            <button className='project-button new-project-button' onClick={() => setShowModal(true)}>+ New Project</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ProjectForm modalSetter={modalSetter} />
                </Modal>
            )}
        </>
    );
}

export default ProjectModal;
