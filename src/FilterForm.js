import React, {useEffect, useRef, useState} from 'react';
import './FilterForm.css';
import * as Database from "./Database";
import {useParams} from 'react-router-dom';
import CriteriaRow from "./CriteriaRow";
import ReactDOM from "react-dom/client";
import Criterion, { getDefaultCriterion } from './Entities/Criterion';


let count = 0;

function FilterForm({filterData}) {
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
        //alertLog(' criteria changede, renders rowws',3)
        if (criteriaContainerRoot.current) {
            const criteriaRows = criteria.map((criterion) => (
                <CriteriaRow
                    filterCriteria={criterion}
                    key={criterion.id}
                    index={criterion.id}
                    onRemove={handleRemoveCriteria}
                    /* onChange={handleCriterionChange}
                     onRemove={handleCriterionRemove}*/
                />
            ));
            criteriaContainerRoot.current.render(criteriaRows); // Render the array of rows
        }
    }, [criteria]);

    // handleRemoveCriteria is called when the remove button is clicked, remove the criterion row
    const handleRemoveCriteria = (index) => {
        //alertLog('handleRemoveCriteria '+index, 3);
        /*     setCriteria(prevCriteria => prevCriteria.filter((_, i) => i !== index));*/
        setCriteria(previousCriteria => {
            return previousCriteria.filter((criterion, currentIndex) => {
                return criterion.id !== index; // Keep only criteria whose index is NOT the one to remove
            });
        });
        alertLog('handleRemoveCriteria done, should call render...', 3);

    };

    // showForm is called when the filterData is set
    function showForm() {
        emptyForm();
        alertLog('showForm', 2)
        alertLog('form is ' + form, 1);
        if (form) {
            alertLog('form is found, now showing', 2)
            form.style.display = 'block';
        }
    }

    // closeForm is called when the close button is clicked
    function closeForm() {
        emptyForm();
        if (form) {
            form.style.display = 'none';
        }
    }

    // emptyForm is called when the form is about to be shown or closed
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

    // addFilterCriteriaRow is called when the "+ Add Row" button is clicked, add new criterion row
    function addFilterCriteriaRow()  {
        alertLog('addFilterCriteriaRow', 3)
       // const newCriterion = { id: Date.now(), type: "amount", comparator: "more", value: "" };
        const newCriterion = getDefaultCriterion();
        setCriteria([...criteria, newCriterion]); // Update the criteria state
    }

   /* function handleCriterionChange(index, updatedCriterion) {
        setCriteria(prevCriteria => prevCriteria.map((criterion, i) => i === index ? updatedCriterion : criterion));
    }

    function handleCriterionRemove(index) {
        setCriteria(prevCriteria => prevCriteria.filter((_, i) => i !== index));
    }
*/


    function saveForm() {
        alertLog('saveForm', 2)
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

    function alertLog(text, level = 0) {
        if (level === 3) {
            count++;
            alert(count + " --- " + text);
            console.debug(count + " --- " + text);
        }
        if (level === 1) {
            //alert(text);
            console.debug(text);
        } else if (level === 2) {
            count++;
            // alert(count + " --- " + text);
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
                                <CriteriaRow
                                    index={index}
                                    key={index}
                                    filterCriteria={criterion}
                                    onRemove={handleRemoveCriteria} />
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