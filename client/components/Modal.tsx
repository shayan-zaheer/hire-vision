import React from 'react';

interface ChildComp{
    children?: React.ReactNode
};

function Modal({ children} : ChildComp) {
  return (
    <div
      className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-hidden="true"
    >
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-4"
        role="dialog"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
