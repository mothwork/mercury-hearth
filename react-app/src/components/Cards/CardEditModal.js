import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CardEditForm from './CardEditForm';

function CardModal({card}) {
    const [showModal, setShowModal] = useState(false);

    const modalSetter = () => {
        setShowModal(false)
    }
    return (
        <>
            <button className='option-button' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CardEditForm card={card} modalSetter={modalSetter} />
                </Modal>
            )}
        </>
    );
}

export default CardModal;
