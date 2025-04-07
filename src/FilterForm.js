import React, {useEffect, useRef, useState} from 'react';
import './FilterForm.css';
import * as Database from "./Database";
import {useParams} from 'react-router-dom';
import CriteriaRow from "./CriteriaRow";
import ReactDOM from "react-dom/client";

let count = 0;
let criteriaContainerRoot = null;
let form = null;

function FilterForm({filterData}) {
    const newFilterFormRef = useRef(null);

    useEffect(() => {
        form = newFilterFormRef.current;
        const criteriaContainer = form.querySelector('.criteria-container');
        criteriaContainerRoot = ReactDOM.createRoot(criteriaContainer);
    }, []);

    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        alertLog("FilterForm useEffec filterData");
        alertLog(JSON.stringify(filterData));

        showForm();

        populateForm(filterData);
        markFinished();
        /*const getFilter = async (id) => {
            if (!id) {
                alertLog('noid ' +id) ;
                return;
            }
            alertLog('getFilter' +id) ;
            setLoading(true);
            setError(null);

            try {
                alertLog("FilterForm useEffect " +id) ;
                const response = await fetch(Database.GET_FILTER+id);
                alertLog('response') ;
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFilter(data);
                populateForm(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false); // Clear loading state
            }
        };*/
    }, [filterData]); // Run the effect whenever the filterData changes


    function populateForm(data) {
        alertLog("populate form", 2);
        alertLog(data, 2);
    }

    function saveForm() {
        alertLog('saveForm', 2)
    }

    function showForm() {
        alertLog('showForm', 2)
        alertLog('form is ' + form, 1);
        if (form) {
            alertLog('form is found, now showing', 2)
            // show the form
            form.style.display = 'block';
        }
    }

    function closeForm() {

        emptyForm();
        if (form) {
            // Hide the form
            //form.style.display = 'none';

            // Or, if you prefer to use a class for styling:
            // form.classList.add('hidden'); // Assuming you have a CSS class named 'hidden'
        }
        // close form
        // remove form from DOM
        // clear filter form values
        // remove all criterion rows
        // empty all values

    }

    function emptyForm() {
        alertLog('emptyForm', 2)
        // clear filter form
        // remove all criterion rows
        // empty all values

        if (form) {
            const filterNameInput = form.querySelector('#filterName');
            if (filterNameInput) {
                filterNameInput.value = '';
            }
            const criteriaRows = form.querySelectorAll('.criteria-row');
            criteriaRows.forEach(row => row.remove());
        }
        alertLog('form after empty: ' + newFilterFormRef.current, 2)

    }

    function addFilterCriteriaRow() {
        alertLog('addFilterCriteriaRow', 2)
        // find ,creteria-container
        // create new criterion row
        // append new criterion row to criteria-container


        let newCriterionRow = <CriteriaRow index={Date.now()} filterCriteria={null}/>;

//        ReactDOM.render(<CriteriaRow key={null} filterCriteria={null} />, newCriterionRow);
        alertLog('criteriaContainer: ' , 2);
        alertLog('newCriterionRow: ' + newCriterionRow, 2);
        if (criteriaContainerRoot) {
            criteriaContainerRoot.render(newCriterionRow);
            alertLog('addFilterCriteriaRow - ROW ADDED', 2);
        }
        alertLog('criteriaContainer after: ' , 2);
        alertLog('newCriterionRow after: ' + newCriterionRow, 2);


    }

    // temp
    function markFinished() {
        // add .green-background to form elements that got the value
        // add .red-background to form elements that did not get the value
        // add .yellow-background to form elements that got the value but not the right one
        // add .green-background to radiobutton form elements that got the value and the right one
        // add .red-background to radiobutton form elements that did not get the value
        // add .yellow-background to radiobutton form elements that got the value but not the right one


        if (form) {
            const filterNameInput = form.querySelector('#filterName');
            if (filterNameInput && filterNameInput.value) {
                filterNameInput.classList.add('green-background');
            } else {
                filterNameInput.classList.add('red-background');
            }
            const criteriaRows = form.querySelectorAll('.criteria-row');
            criteriaRows.forEach(row => {
                const inputs = row.querySelectorAll('input, select');
                inputs.forEach(input => {
                    if (input.value) {
                        input.classList.add('green-background');
                    } else {
                        input.classList.add('red-background');
                    }
                });
            });
        }

        /*
        if (form) {
            const filterNameInput = form.querySelector('#filterName');
            if (filterNameInput && filterNameInput.value) {
                filterNameInput.classList.add('green-background');
            } else {
                filterNameInput.classList.add('red-background');
            }
            const criteriaRows = form.querySelectorAll('.criteria-row');
            criteriaRows.forEach(row => {
                const inputs = row.querySelectorAll('input, select');
                inputs.forEach(input => {
                    if (input.value) {
                        input.classList.add('green-background');
                    } else {
                        input.classList.add('red-background');
                    }
                });
            });
        }*/
    }

    // temp
    function alertLog(text, level = 0) {


        if (level === 1) {
            alert(text);
            console.debug(text);
        } else if (level === 2) {
            count++;
            alert(count + " --- " + text);
            console.debug(count + " --- " + text);
        } else
            console.log(text);

    }

    return (
        <div className="new-filter-form" id={"new-filter-form"} ref={newFilterFormRef}>
            <div className="filter-modal">
                <div className="modal-header">
                    <span>Filter</span>
                    <span>{filterData ? <pre>{JSON.stringify(filterData, null, 2)}</pre> : 'no filter selected'}</span>
                    <span onClick={closeForm}>✖</span>
                </div>

                <div className="modal-content">
                    <div className="form-row">
                        <label>Filter name</label>
                        <input id="filterName" type="text" value={filterData?.name}/>
                    </div>

                    <div className="form-row">
                        <label>Criteria</label>
                        <span className="criteria-container">

                        {filterData?.criteria?.map((criterion, index) => (
                            <CriteriaRow key={Date.now()} filterCriteria={criterion}/>
                        ))}

                        </span>
                    </div>

                    <div className="form-row">
                        <button onClick={addFilterCriteriaRow}>+ Add Row</button>
                    </div>

                    <div className="form-row">
                        <label>Usage</label>
                        <input type="radio" name="selection" value="common"
                               checked={filterData?.selection === 'common'}/>Common
                        <input type="radio" name="selection" value="rare"
                               checked={filterData?.selection === 'rare'}/>Rare
                        <input type="radio" name="selection" value="special"
                               checked={filterData?.selection === 'special'}/>Special
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={closeForm} className="btn btn-close">CLOSE</button>
                    <button onClick={saveForm} className="btn btn-save">SAVE</button>
                </div>
            </div>
        </div>
    );

}

export default FilterForm;
