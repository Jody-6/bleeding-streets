import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onConfirm, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content relative">
                <button className="absolute top-3 right-5" onClick={() => onClose()}>
                    X
                </button>
                <h2 className='mt-2'>Are you sure you want to delete this character?</h2>
                <div className='flex mt-4'>
                    <button className="button mr-2" onClick={() => onConfirm()}>
                        Yes
                    </button>
                    <button className="button ml-2" onClick={() => onClose()}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
