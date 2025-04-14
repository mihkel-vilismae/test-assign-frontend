// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './styles/App.css';
import ExistingFilters from "./components/ExistingFilters";
import FilterForm from "./components/FilterForm";
import {Modal} from "./components/Modal";
import {getDefaultActiveFilter} from "./entities/DataObjects";
import {debug, showAlert} from "./utils/Debug";


export const alertLog = (text) => {
    if (!showAlert) return
    alert(text)
}

function App() {

    const [showModal, setShowModal] = useState(false);
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
