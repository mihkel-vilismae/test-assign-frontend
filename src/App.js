// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import ExistingFilters from "./ExistingFilters";
import FilterForm from "./FilterForm";
import {Modal} from "./components/Modal";
import * as Database from "./Database";

function App() {
    const [editFilterFromChild, setEditFilterFromChild] = useState(null);
    const [filters, setFilters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const formRef = useRef(null);
    const [filterData, setFilterData] = useState({}); // State to hold filter data
    const modalContentRef = useRef(null); // Ref to access the FilterForm in the modal
    const [internalFilterData, setInternalFilterData] = useState({});

    const openModal = () => {
        setShowModal(true);
        console.log('internalFilterData', internalFilterData);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
    }, [internalFilterData]);

    const handleSave = () => {
        // Access the updated filter data from the modal's FilterForm
        const updatedFilterData = modalContentRef.current.getFilterData();
        setFilterData(updatedFilterData); // Update the main filter data
        closeModal();
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
                        <FilterForm filterData={editFilterFromChild}  onChange={setInternalFilterData}/>
                    </div>
                </div>
                <div className="rect-area alert alert-info" id="open-modal">
                    <div className="center-content text-center">
                        <button onClick={openModal}>Open Modal</button>
                    </div>
                </div>

                <Modal isOpen={showModal} onClose={closeModal} onSave={handleSave}> {/* Render the Modal */}
                    <FilterForm
                        ref={modalContentRef}
                        filterData={internalFilterData}
                        onChange={setInternalFilterData}
                    />
                </Modal>
            </div>

        </div>

    );
}

export default App;