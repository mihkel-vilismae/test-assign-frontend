// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useRef, useState} from 'react';
import './App.css';
import ExistingFilters from "./ExistingFilters";
import FilterForm from "./FilterForm";
import {BrowserRouter} from 'react-router-dom'; // Or other Router type
import {alertLog} from "./Database";
import Button from "bootstrap/js/src/button";

function Modal({ isOpen, onClose }) {
    if (!isOpen) {
        return null; // Don't render anything if the modal is closed
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div>This is modal</div>
                <button onClick={onClose}>Close</button> {/* Close button */}
            </div>
        </div>
    );
}

function App() {
    const [editFilterFromChild, setEditFilterFromChild] = useState(null);
    const [filters, setFilters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const formRef = useRef(null);
    const [filterData, setFilterData] = useState({}); // State to hold filter data
    const modalContentRef = useRef(null); // Ref to access the FilterForm in the modal

    /*const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };*/

    const handleSubmit = (event) => {
        alert("handleSubmit - not implemented");
        event.preventDefault();

        const form = showModal ? document.getElementById('modalForm') : formRef.current;
        const formData = new FormData(form);

        // ... process formData ...

        closeModal();
    };


    const openModal = () => {
        alert("Open modal - setShowModal->sj" );
        setShowModal(true);
    };

    const closeModal = () => {
        alert("closeModal modal - . setShowModal->jh" );
        setShowModal(false);
    };


    const saveFilter = (event) => {

        alertLog("saveFilter- not implemented" );return;
        event.preventDefault();
        const newFilter = event.target.elements.filterInput.value;
        alertLog(newFilter);
        setFilters([...filters, {name: newFilter, select: "", criteria: ""}]);
        event.target.reset();
    };

    const receiveDataFromChild = (data) => {
        setEditFilterFromChild(data);
    };

    return (
        <div className="app-container container">
            <div className="centered-content row justify-content-center">
                <div className="rect-area alert alert-danger">
                    <div className="center-content text-center">
                        <button onClick={openModal} className="btn btn-primary">Open Modal</button>
                    </div>
                </div>
                <div className="rect-area alert alert-success">
                    <div className="center-content text-center">
                        <ExistingFilters onDataChange={receiveDataFromChild}/>
                    </div>
                </div>
                <div className="rect-area alert alert-info" id="add-filter">
                    <div className="center-content text-center">
                        <FilterForm filterData={editFilterFromChild}/>
                    </div>
                </div>
                <div className="rect-area alert alert-info" id="open-modal">
                    <div className="center-content text-center">
                        <button onClick={openModal}>Open Modal</button>
                    </div>
                </div>
                <Modal isOpen={showModal} onClose={closeModal}> {/* Render the Modal */}
                    <FilterForm
                        ref={modalContentRef}
                        filterData={filterData}
                        onChange={setFilterData}
                    />
                </Modal>
            </div>

        </div>

    );
}

export default App;