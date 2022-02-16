import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CardForm from './CardForm';

function CardModal() {
    const [showModal, setShowModal] = useState(false);

    const modalSetter = () => {
        setShowModal(false)
    }
    return (
        <>
            <button className=' add-card' onClick={() => setShowModal(true)}>+</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CardForm modalSetter={modalSetter} />
                </Modal>
            )}
        </>
    );
}

export default CardModal;
