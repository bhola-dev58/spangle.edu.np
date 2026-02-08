import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Assuming heroicons is installed as used in Home.js

import ReactDOM from 'react-dom';

const Popup = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm" style={{ zIndex: 2147483647 }}>

            <div className="relative bg-white p-1 rounded-lg shadow-2xl animate-fade-in-up max-w-lg w-[90%] md:w-auto" style={{ border: '5px solid #FFA500' }}>
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-orange-600 text-white rounded-full p-2 hover:bg-orange-700 transition-colors shadow-lg z-10"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="relative overflow-hidden rounded">
                    <img
                        src={imageSrc}
                        alt="Popup Announcement"
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Popup;

