import React from 'react';
import '../../../app/globals.css'

interface ModalProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    children?: React.ReactNode;
    onClose: () => void;
    onClickAction: () => void;
    type: 'normal' | 'confirmed' | 'danger';
}

const DefaultModal: React.FC<ModalProps> = ({ title, description, children, isOpen, onClose, onClickAction, type }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
            {type === 'normal' ? (
                <div className='p-4 bg-white rounded-lg justify-center items-end gap-3 inline-flex z-50'>
                    <div className='rounded-sm justify-start items-center gap-4 flex'>
                        <div className='bg-white rounded-sm justify-center items-center gap-2.5 flex'>
                            <div className='px-4 py-2 rounded-sm shadow border border-neutral-400 justify-start items-center flex'>
                                <div className="text-center text-neutral-800 text-sm font-normal font-['Helvetica Neue'] leading-tight">Skip</div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-sm justify-start items-center gap-24 flex'>
                        <div className='px-4 py-2 bg-green-400 rounded-sm shadow justify-center items-center flex'>
                            <div className="text-center text-white text-sm font-normal font-['Helvetica Neue'] leading-tight">Next</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-1/2 p-4 bg-white rounded-lg justify-center items-start inline-flex z-50'>
                    <div className='flex-col justify-end items-center gap-8 inline-flex'>
                        <div className='flex-col justify-start items-center gap-5 flex'>
                            <div className="flex items-start justify-space w-full px-1 py-4 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="headingLg">
                                    {title}
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={onClose}
                                >
                                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                            </div>
                            <div className='flex-col justify-start items-start gap-y-3 w-full px-1 pb-4 border-b border-solid border-slate-200 flex'>
                                <div className="text-black text-xl bodyMd leading-normal">{ description }</div>
                            </div>
                        </div>
                        {type === "confirmed" ? (
                            <div className='w-36 px-10 py-3.5 bg-green-400 rounded shadow justify-center items-center gap-2 inline-flex'>
                                <div className="text-center text-white text-base font-bold font-['Helvetica Neue'] leading-tight">Confirm</div>
                            </div>
                        ) : (
                            <div className='justify-end items-end gap-4 inline-flex'>
                                <div className='justify-center items-end gap-4 flex cursor-pointer' onClick={onClose}>
                                    <div className='h-12 px-8 py-3.5 bg-white rounded shadow border border-neutral-400 justify-center items-center gap-2 flex'>
                                        <div className="text-center text-neutral-800 text-base bodyMd leading-tight">Cancel</div>
                                    </div>
                                </div>
                                <div className='h-12 justify-start items-start flex cursor-pointer' onClick={onClickAction}>
                                    <div className='grow shrink basis-0 h-12 px-8 py-3.5 bg-red-600 rounded shadow justify-center items-center gap-2 flex'>
                                        <div className="text-center text-white text-base bodyMd leading-tight">Delete</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DefaultModal;