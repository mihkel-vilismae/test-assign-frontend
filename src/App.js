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
    const [filterData, setFilterData] = useState({}); // State to hold filter data
    const modalContentRef = useRef(null); // Ref to access the FilterForm in the modal
    const formContentRef = useRef(null); // Ref to access the FilterForm in the modal
    const [internalFilterData, setInternalFilterData] = useState({});

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        const updatedFilterData = modalContentRef.current.getFilterData();
        setFilterData(updatedFilterData);
        closeModal();
    };

    useEffect(() => {
        //updateModalValues(internalFilterData);
    }   , [internalFilterData]);

    /*const updateModalValues = (internalFilterData) => {
        if (!internalFilterData) return;
        // Access the FilterForm's internal state using the ref
//        const updatedFilterData = modalContentRef.current.getFilterData();
        modalContentRef.current.filterData(internalFilterData);
        formContentRef.current.filterData(internalFilterData);
        console.log('Saved Filter Data:', internalFilterData);
        setFilterData(internalFilterData); // Update the parent state
    };
*/
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
                        <FilterForm
                            filterData={editFilterFromChild}
                            onChange={filterValuesChanged}
                            ref={formContentRef}
                        />
                    </div>
                </div>
                <Modal isOpen={showModal} onClose={closeModal} onSave={handleSave}>
                    <FilterForm
                        ref={modalContentRef}
                        filterData={editFilterFromChild}
                        onChange={filterValuesChanged}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default App;
