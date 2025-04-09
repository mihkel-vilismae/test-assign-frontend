import React from "react";

export function Modal({isOpen, onClose, children, onSave}) {
    if (!isOpen) {
        return null; // Don't render anything if the modal is closed
    }

    return (
        /*<div className="modal-overlay">
            <div className="modal-content">
                <div>This is modal</div>
                <button onClick={onClose}>Close</button>
                {/!* Close button *!/}
            </div>
        </div>*/
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children} {/* Render the children passed to the Modal */}
                <button onClick={onSave}>Save Changes</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );

}

const FilterForm = React.forwardRef((props, ref) => {
    // You can use the ref here if needed
    return (
        <div ref={ref}>
            {/* Your HelperDiv content goes here */}
            <p>This is the FilterForm content inside the modal.</p>
        </div>
    );
});

