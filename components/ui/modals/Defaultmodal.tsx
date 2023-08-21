import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid'


interface ModalProps {
    Icon: React.ComponentType<any>;
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    onClickAction: () => void;
}

const Modal: React.FC<ModalProps> = ({ Icon, title, description, isOpen, onClose, onClickAction }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg relative flex flex-col items-center justify-center gap-4"
                 style={{ width: '428px', height: '360px', boxShadow: '0px 26px 80px rgba(0, 0, 0, 0.20), 0px 0px 1px rgba(0, 0, 0, 0.20)' }}>
                <Icon className="h-24 w-24 text-green text-actionprimarydefault" aria-hidden={true} />
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-center">{description}</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded" onClick={onClickAction}>
                    Action
                </button>
            </div>
        </div>
    );
}

export default Modal;
