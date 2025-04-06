import React, {useEffect, useRef, useState} from 'react';
import './FilterForm.css';
import * as Database from "./Database";
import {useParams} from 'react-router-dom';

let count = 0;
function FilterForm({filterData}) {

    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const newFilterFormRef = useRef(null);


    useEffect(() => {
        alertLog("FilterForm useEffec filterData");
        alertLog(JSON.stringify(filterData));

        showForm();

        populateForm(filterData);
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
        alertLog("populate form",2);
        alertLog(data,2);
    }

    function saveForm() {
        alertLog('saveForm',2)
    }

    function showForm() {
        alertLog('showForm',2)
        const form = newFilterFormRef.current;
        alertLog('form is ' + form,1);
        if (form) {
            alertLog('form is found, now showing',2)
            // show the form
            form.style.display = 'block';
        }
    }

    function closeForm() {
        const form = newFilterFormRef.current;
        emptyForm();
        if (form) {
            // Hide the form
            form.style.display = 'none';

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
        alertLog('emptyForm',2)
        // clear filter form
        // remove all criterion rows
        // empty all values
        const form = newFilterFormRef.current;
        if (form) {
            const filterNameInput = form.querySelector('#filterName');
            if (filterNameInput) {
                filterNameInput.value = '';
            }
            const criteriaRows = form.querySelectorAll('.criteria-row');
            criteriaRows.forEach(row => row.remove());
        }
        alertLog('form after empty: '+ newFilterFormRef.current ,2)

    }

    function addFilterCriteriaRow() {
        alertLog('addFilterCriteriaRow',2)
        // add new criterion row
        // generate default criterion row
        // append new criterion row to form
    }
    
    function alertLog(text, level=0) {


        if (level === 1) {
            alert( text);
            console.debug(text);
        } else if (level === 2) {
            count++;
            alert(count + " --- "+text);
            console.debug(count + " --- "+text);
        }
        else
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
                        <div className="criteria-row" key={index}>
                            <select value={criterion.type}>
                                <option value="amount">Amount</option>
                                <option value="title">Title</option>
                                <option value="date">Date</option>
                            </select>

                            {criterion.type === 'amount' && (
                                <span>
                                    <select value={criterion.comparator}>
                                        <option value="more">More</option>
                                        <option value="less">Less</option>
                                        <option value="equals">Equals</option>
                                    </select>
                                    <input type="number" value={criterion.value}/>
                                </span>
                            )}

                            {criterion.type === 'title' && (
                                <span>
                                    <select value={criterion.comparator}>
                                        <option value="more">More</option>
                                        <option value="less">Less</option>
                                        <option value="equals">Equals</option>
                                    </select>
                                    <input type="text" value={criterion.value}/>
                                </span>
                            )}

                            {criterion.type === 'date' && (
                                <span>
                                     <select value={criterion.comparator}>
                                        <option value="to">To</option>
                                        <option value="from">From</option>
                                        <option value="exactly">Exactly</option>
                                    </select>
                                    <input type="date" value={criterion.date}/>
                                </span>
                            )}
                            <span className="remove-criteria">✖</span>
                        </div>
                    ))}

                            {/*         <div className="criteria-row">
                            <select>
                                <option value="amount">Amount</option>
                                <option value="title">Title</option>
                                <option value="date">Date</option>
                            </select>
                            <select>
                                <option value="more">More</option>
                                <option value="less">Less</option>
                                <option value="equals">Equals</option>
                            </select>
                            <select>
                                <option value="starts_with">Starts with</option>
                                <option value="ends_with">Ends with</option>
                                <option value="contains">Contains</option>
                            </select>
                            <input type="text"/>
                            <span className="remove-criteria">✖</span>
                        </div>*/}


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
