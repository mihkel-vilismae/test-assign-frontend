import React, {useEffect, useRef, useState} from 'react';
import './FilterForm.css';
import * as Database from "./Database";
import {useParams} from 'react-router-dom';
import CriteriaRow from "./CriteriaRow";
import ReactDOM from "react-dom/client";

let count = 0;

function FilterForm({filterData}) {
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterName, setFilterName] = useState(filterData?.name || '');
    const [selection, setSelection] = useState(filterData?.selection || '');
    const newFilterFormRef = useRef(null);
    const [form, setForm] = useState(null);
    const [criteriaContainer, setCriteriaContainer] = useState(null);
    const criteriaContainerRoot = useRef(null);
    const [criteria, setCriteria] = useState([]);

    useEffect(() => {
        alert(' const currentCriteriaContainer = currentForm.querySelector(.criterias');

        const currentForm = newFilterFormRef.current;
        const currentCriteriaContainer = currentForm.querySelector('.criteria-container');
        const currentCriteriaContainerRoot = ReactDOM.createRoot(currentCriteriaContainer);

        setForm(currentForm);
        setCriteriaContainer(currentCriteriaContainer);
        criteriaContainerRoot.current = currentCriteriaContainerRoot;
    }, []);

    useEffect(() => {
        alert('FilterForm useEffect flterdara muutus');


        alertLog("FilterForm useEffect filterData");
        alertLog(JSON.stringify(filterData));

        showForm();
        populateForm(filterData);
        markFinished();
    }, [filterData]);

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
            form.style.display = 'block';
        }
    }

    function closeForm() {
        emptyForm();

        if (form) {
            form.style.display = 'none';
        }
    }

    function emptyForm() {
        alertLog('emptyForm', 2)

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

    function addFilterCriteriaRow()  {
        const newCriterion = { id: Date.now(), type: "amount", comparator: "more", value: "" };
        setCriteria([...criteria, newCriterion]); // Update the criteria state
    }

    useEffect(() => { // Re-render whenever criteria changes
        if (criteriaContainerRoot.current) {
            const criteriaRows = criteria.map((criterion) => (
                <CriteriaRow key={criterion.id} index={criterion.id} filterCriteria={criterion} />
            ));
            criteriaContainerRoot.current.render(criteriaRows); // Render the array of rows
        }
    }, [criteria]);


    function markFinished() {

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
    }

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
                        <input id="filterName" type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)}/>
                    </div>

                    <div className="form-row">
                        <label>Criteria</label>
                        <span className="criteria-container">
                            {filterData?.criteria?.map((criterion, index) => (
                                <CriteriaRow key={index} filterCriteria={criterion}/>
                            ))}
                        </span>
                    </div>

                    <div className="form-row">
                        <button onClick={addFilterCriteriaRow}>+ Add Row</button>
                    </div>

                    <div className="form-row">
                        <label>Usage</label>
                        <input type="radio" name="selection" value="common" checked={selection === 'common'} onChange={() => setSelection('common')}/>Common
                        <input type="radio" name="selection" value="rare" checked={selection === 'rare'} onChange={() => setSelection('rare')}/>Rare
                        <input type="radio" name="selection" value="special" checked={selection === 'special'} onChange={() => setSelection('special')}/>Special
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