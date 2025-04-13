// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import ExistingFilters from "./components/ExistingFilters";
import FilterForm from "./components/FilterForm";
import {Modal} from "./components/Modal";
import * as Database from "./Database";
import Criterion from "./Entities/Criterion";

export const criteria = {
    id: '',
    type: '',
    comparator: '',
    value: ''
};

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

    const filterValuesChanged = (data) => {
        alert('Filter Values Changed: ' + JSON.stringify(data));
        setInternalFilterData(data);
    }

    useEffect(() => {
        updateModalValues(internalFilterData);
    }   , [internalFilterData]);

    const updateModalValues = (internalFilterData) => {
        if (!internalFilterData) return;
        // Access the FilterForm's internal state using the ref
        //  const updatedFilterData = modalContentRef.current.getFilterData();
        //modalContentRef.current.filterData(internalFilterData);
        //formContentRef.current.filterData(internalFilterData);
        console.log('Saved Filter Data:', internalFilterData);
        setFilterData(internalFilterData); // Update the parent state
    };
    const receiveDataFromChild = (data) => {
        setEditFilterFromChild(data);
    };
    const [allData, setAllData] = useState([{name: '',selection:'',criteria: [Criterion]}]);
    const [activeFilterData, setActiveFilterData] = useState(null);
    //{name: '',selection:'',criteria: [Criterion]}


    useEffect(() => {
        alert('setNme '+JSON.stringify(allData))
    }, [allData]);

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
                        <ExistingFilters
                            onDataChange={receiveDataFromChild}
                            onChooseFilter={setActiveFilterData}/>
                    </div>
                </div>
                <div className="rect-area alert alert-info" id="add-filter">
                    <div className="center-content text-center">
                        <FilterForm
                            /*filterData={editFilterFromChild}
                            onChange={filterValuesChanged}*/
                            ref={formContentRef}
                            allData={allData}
                            setAllData={setAllData}
                            activeFilterData={activeFilterData}
                            setActiveFilterData={setActiveFilterData}
                        />
                    </div>
                </div>
                <Modal isOpen={showModal} onClose={closeModal} onSave={handleSave}>
                    <FilterForm
                        ref={modalContentRef}
                       /* filterData={editFilterFromChild}
                        onChange={filterValuesChanged}*/
                        allData={allData}
                        setAllData={setAllData}
                        activeFilterData={activeFilterData}
                        setActiveFilterData={setActiveFilterData}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default App;
