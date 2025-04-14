// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react';
import './styles/App.css';
import ExistingFilters, {debug, hasData} from "./components/ExistingFilters";
import FilterForm from "./components/FilterForm";
import {Modal} from "./components/Modal";
import {getDefaultActiveFilter} from "./Entities/DataObjects";

export const showAlert = false;
export const alertLog = (text) => {
    if (!showAlert) return
    alert(text)
}

function App() {

    const [showModal, setShowModal] = useState(false);
    const modalContentRef = useRef(null); // Ref to access the FilterForm in the modal
    const formContentRef = useRef(null); // Ref to access the FilterForm in the modal
    const [allData, setAllData] = useState([{name: '', selection: '', criteria: [{}]}]);
    const [activeFilterData, setActiveFilterData] = useState(getDefaultActiveFilter());

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleClose = () => {
        emptyForm();
        if (showModal)
            closeModal();
    }

    function emptyForm() {
        setActiveFilterData(getDefaultActiveFilter())
    }

    useEffect(() => {
        if (!hasData) return;
        if (!debug) return;
        alertLog('app allData change ' + JSON.stringify(allData))
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
                            allData={allData}
                            setAllData={setAllData}
                            onChooseFilter={setActiveFilterData}
                        />
                    </div>
                </div>
                <div className="rect-area alert alert-info" id="add-filter">
                    <div className="center-content text-center">
                        <FilterForm
                            ref={formContentRef}
                            allData={allData}
                            setAllData={setAllData}
                            activeFilterData={activeFilterData}
                            setActiveFilterData={setActiveFilterData}
                            onClose={handleClose}
                        />
                    </div>
                </div>
                <Modal
                    isOpen={showModal}
                >
                    <FilterForm
                        ref={modalContentRef}
                        allData={allData}
                        setAllData={setAllData}
                        activeFilterData={activeFilterData}
                        setActiveFilterData={setActiveFilterData}
                        onClose={handleClose}
                    />
                </Modal>
            </div>
        </div>
    );
}

export default App;
