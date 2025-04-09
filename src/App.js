// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import './App.css';
import ExistingFilters from "./ExistingFilters";
import FilterForm from "./FilterForm";
import {BrowserRouter} from 'react-router-dom'; // Or other Router type
import {alertLog} from "./Database";

function App() {
    const [editFilterFromChild, setEditFilterFromChild] = useState(null);
    const [filters, setFilters] = useState([]);

    const openModal = () => {
        alertLog("Open modal - not implemented" );
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
                        <ExistingFilters onDataChange={receiveDataFromChild} />
                    </div>
                </div>
                <div className="rect-area alert alert-info" id="add-filter">
                    <div className="center-content text-center">
                        <FilterForm filterData={editFilterFromChild} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;