import React from "react";

export function Modal({isOpen, onClose, children, onSave}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
