import React from 'react';
import Login from './Login';
import Register from './Register';

const SlidingPanel = ({ isOpen, onClose, panelType }) => {
  return (
    <div className={`fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="max-w-md w-full bg-white rounded shadow-lg overflow-hidden">
        <div className="flex justify-between items-center border-b p-2">
          <button className="text-gray-600" onClick={onClose}>Close</button>
        </div>
        <div className="p-4">
          {panelType === 'klient' && (
            <Login />
          )}
          {panelType === 'admin' && (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
};

export default SlidingPanel;
