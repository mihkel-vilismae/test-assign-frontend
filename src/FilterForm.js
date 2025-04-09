import React, { useEffect, useRef, useState } from 'react';
import './FilterForm.css';
import * as Database from "./Database";
import { alertLog } from "./Database";
import { useParams } from 'react-router-dom';
import CriteriaRow from "./CriteriaRow";
import ReactDOM from "react-dom/client";
import Criterion, { getDefaultCriterion } from './Entities/Criterion';

let count = 0;

function FilterForm({ filterData }) {
    const [filterName, setFilterName] = useState('');
    const [selection, setSelection] = useState('');
    const newFilterFormRef = useRef(null);
    const [form, setForm] = useState(null);
    const [criteriaContainer, setCriteriaContainer] = useState(null);
    const criteriaContainerRoot = useRef(null);
    const [criteria, setCriteria] = useState([]);

    // initializes variables
    useEffect(() => {
        const currentForm = newFilterFormRef.current;
        const currentCriteriaContainer = currentForm.querySelector('.criteria-container');
        const currentCriteriaContainerRoot = ReactDOM.createRoot(currentCriteriaContainer);

        setForm(currentForm);
        setCriteriaContainer(currentCriteriaContainer);
        criteriaContainerRoot.current = currentCriteriaContainerRoot;
    }, []);


    // filterData is changed, initializes the form with the filterData
    useEffect(() => {
        alertLog("FilterForm useEffect- filterData is set");
        alertLog(JSON.stringify(filterData));

        showForm();
        populateForm(filterData);
        markFinished();
    }, [filterData]);

    function populateForm(filterData) {
        setFilterName(filterData?.name || '');
        setSelection(filterData?.selection || '');
        setCriteria(filterData?.criteria || []);
    }

    useEffect(() => { // Re-render whenever criteria changes
        if (criteriaContainerRoot.current) {
            alertLog(JSON.stringify(criteria))
            const criteriaRows = criteria.map((criterion) => (
                <CriteriaRow
                    filterCriteria={criterion}
                    key={criterion.id}
                    index={criterion.id}
                    onRemove={handleRemoveCriteria}
                    onChange={()=>  alert('onChange jee')}

                />
            ));
            criteriaContainerRoot.current.render(criteriaRows);
        }
    }, [criteria]);

    // handleRemoveCriteria is called when the remove button is clicked, remove the criterion row
    const handleRemoveCriteria = (index) => {
        alertLog(`handleRemoveCriteria - Removing criterion at index ${index}`, 3);
        setCriteria(prevCriteria => prevCriteria.filter(criterion => criterion.id !== index));
        alertLog('handleRemoveCriteria done, should call render...', 3);
    };

    // showForm is called when the filterData is set
    function showForm() {
        emptyForm();
        alertLog('showForm', 2);
        alertLog('form is ' + form, 1);
        if (form) {
            alertLog('form is found, now showing', 2);
            form.setAttribute('style', 'display: block;');
        } else alertLog('form is not found', 2);
    }

    // closeForm is called when the close button is clicked
    function closeForm() {
        emptyForm();
        if (form) {
            form.setAttribute('style', 'display: none;');
        }else alertLog('form is not found', 2);
    }

    // emptyForm is called when the form is about to be shown or closed
    function emptyForm() {
        alertLog('emptyForm', 2);
        setFilterName('');
        setCriteria([]);
        alertLog('form after empty: ' + newFilterFormRef.current, 2);
    }

    // addFilterCriteriaRow is called when the "+ Add Row" button is clicked, add new criterion row
    function addFilterCriteriaRow() {
        alertLog('addFilterCriteriaRow', 3);
        const newCriterion = getDefaultCriterion();
        setCriteria([...criteria, newCriterion]);
    }

    function saveForm() {
        alertLog('saveForm', 2);
    }

    function markFinished() {
        return;
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


    return (
        <div className="new-filter-form" id={"new-filter-form"} ref={newFilterFormRef}>
            <div className="filter-modal modal-dialog">
                <div className="modal-header bg-primary text-white">
                    <span>Filter</span>
                    <span>{filterData ? <pre>{JSON.stringify(filterData, null, 2)}</pre> : 'no filter selected'}</span>
                    <span onClick={closeForm} className="close">✖</span>
                </div>

                <div className="modal-content">
                    <div className="form-row form-group">
                        <label>Filter name</label>
                        <input id="filterName" className="input-field form-control" type="text" value={filterName}
                               onChange={(e) => setFilterName(e.target.value)}/>
                    </div>

                    <div className="form-row form-group">
                        <label>Criteria</label>
                        <span className="criteria-container">

                </span>
                    </div>

                    <div className="form-row form-group text-center">
                        <button className="mx-auto btn btn-light" onClick={addFilterCriteriaRow}>+ Add Row</button>
                    </div>

                    <div className="form-row form-group">
                        <label className="form-label">Usage</label>
                        <div className="radio-group">
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="common" checked={selection === 'common'}
                                       onChange={() => setSelection('common')} className="form-check-input"/>Common
                            </label>
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="rare" checked={selection === 'rare'}
                                       onChange={() => setSelection('rare')} className="form-check-input"/>Rare
                            </label>
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="special" checked={selection === 'special'}
                                       onChange={() => setSelection('special')} className="form-check-input"/>Special
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={closeForm} className="btn btn-secondary">CLOSE</button>
                    <button onClick={saveForm} className="btn btn-primary">SAVE</button>
                </div>
            </div>
        </div>
    );
}

export default FilterForm;