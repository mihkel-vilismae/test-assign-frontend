// App.js
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
            <div className="app-container">
                <div className="centered-content">

                    <div className="rect-area" style={{backgroundColor: '#ffe0e0'}}>
                        <div className="center-content">
                            <button onClick={openModal}>Open Modal</button>
                        </div>
                    </div>

                    <div className="rect-area" style={{backgroundColor: '#e0ffe0'}}>
                        <div className="center-content">
                            <ExistingFilters onDataChange={receiveDataFromChild}/>
                        </div>
                    </div>

                    <div className="rect-area" id="add-filter" style={{backgroundColor: '#e0f5ff'}}>
                        <div className="center-content">
                            <FilterForm filterData={editFilterFromChild}/>
                        </div>
                    </div>

                </div>
            </div>
    );
}

export default App;