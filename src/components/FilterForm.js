import React, { useEffect, useRef, useState } from 'react';
import '../styles/FilterForm.css';
import ReactDOM from "react-dom/client";
import Criterion, {getDefaultActiveFilter, getDefaultCriterion} from '../Entities/Criterion';
import CriteriaRow from "./CriteriaRow";
import criterion from "../Entities/Criterion";
import {c} from "react/compiler-runtime";
import {debug, hasData} from "./ExistingFilters";
import {alertLog} from "../App";

const FilterForm = React.forwardRef(({setActiveFilterData, activeFilterData, filterData, onChange, allData, setAllData }, ref) => {
    const [filterName, setFilterName] = useState('');
    const newFilterFormRef = useRef(null);
    const [form, setForm] = useState(null);
   // if (!activeFilterData)
    const [criteria, setCriteria] = useState([]);

    //const [internalFilterData, setInternalFilterData] = useState({});


    /*const getFilterData = () => {
        return internalFilterData;
    };

    const setFilterCriteria = (criteria) => {
        setCriteria(criteria);
    }

    const setFilterData = (data) => {
        setInternalFilterData([])
        setInternalFilterData(data);
        setCriteria(data.criteria);
    }*/

    const handleRemoveCriteria = (id) => {
        alertLog(id)
        /*alertLog(JSON.stringify(activeFilterData))
        alertLog(JSON.stringify(activeFilterData.criteria))
        setCriteria(prevCriteria => prevCriteria.filter(criterion => criterion.id !== id));
        setAllData(...allData, criteria);
        alertLog(JSON.stringify(activeFilterData))
        alertLog(JSON.stringify(activeFilterData.criteria))*/
    };

    function showForm() {
        emptyForm();
        if (form) {
            form.setAttribute('style', 'display: block;');
        }
    }

    function emptyForm() {
        setFilterName('');
        setCriteria([]);
    }


//--------------------------------------------
    function closeForm() {
        alertLog('closeForm')
    }
    function saveForm() {
        alertLog('act '+ JSON.stringify(activeFilterData))
        alertLog('allA '+ JSON.stringify(allData))
        const filterToEdit = findFilterById(activeFilterData.id);
        saveActiveFilter(activeFilterData);
        //alertLog('filterToEdit '+ filterToEdit)
        alertLog('saveForm')

    }


    const findFilterCriterionById = (id) => {
        return allData.find(item => item.id === id);
    };

    // logggiong
    useEffect(() => {
        if (!hasData) return;
        if (!debug) return;
        alertLog('filrewform allData ch '+JSON.stringify(allData))
    }   , [allData]);

    // logggiong
    useEffect(() => {
        if (!hasData) return;
        if (!debug) return;
        alertLog('setActiveFilterData' +JSON.stringify(activeFilterData))
        setActiveFilterData(activeFilterData);
        alertLog('all' +JSON.stringify(allData))
    }, [activeFilterData]);




    function addFilterCriteriaRow() {
        if (!activeFilterData) {
            activeFilterData = createActiveFilterData();
        }
        const newCriterion = getDefaultCriterion();
        alertLog('newCriterion '+JSON.stringify(newCriterion))
       // setCriteria([...criteria, newCriterion]);
        const updatedCriteria = [...activeFilterData.criteria, newCriterion];
        setActiveFilterData({ ...activeFilterData, criteria: updatedCriteria });
        alertLog('mew rpw ')
    }

    function createActiveFilterData() {
        const defaultFilter = getDefaultActiveFilter();
        alert('def '+JSON.stringify(defaultFilter ))
        return defaultFilter;
    }
    // find item from allData array using ID value

    const findFilterById = (filterId) => {
        return allData.find(filter => filter.id === filterId);
    };

    // updates the allData object with the changed filter, or adds a new one to the allData.criteria
    const saveActiveFilter = (newData) => {
        const filterId = newData.id;
        const isNew = !findFilterById(filterId);
        alertLog('isNew:: '+ isNew)
        if (isNew) {
            activeFilterData = newData;
            allData.push(activeFilterData);
            setAllData(allData);
        }
        setAllData((prevAllData) => {
            const updatedData = prevAllData.map((filter) => {
                    return filter.id === filterId ? {...filter, ...newData} : filter;
                }
            );
            return updatedData;
        });
    };

    const handleFormDataChange = (name, value) => {
        if (!activeFilterData) {
            const defaultActiveFilter = getDefaultActiveFilter();
            setActiveFilterData(defaultActiveFilter);
            activeFilterData = defaultActiveFilter;
        }
        alertLog('Form:handleFormDataChange : '+JSON.stringify({ ...activeFilterData, [name]: value }))
        setActiveFilterData({ ...activeFilterData, [name]: value });

    };

    return (
        <div className="new-filter-form" id={"new-filter-form"} ref={newFilterFormRef}>
            <div className="filter-modal modal-dialog">
                <div className="modal-header bg-primary text-white">
                    <span>activeFilter Fields</span>
                    <div
                        className={'bg-color1'}> {activeFilterData ? (JSON.stringify(Object.fromEntries(Object.entries(activeFilterData).filter(([key]) => key !== 'criteria')), null, 2)) : ('no filter selected')}
                    </div>
                </div>
                <div className="modal-header bg-primary text-white">
                    <span>activeFilter Criteria</span>
                    <div
                        className={'bg-color2'}>
                        {activeFilterData ? JSON.stringify(activeFilterData['criteria'], null, 2) : 'no filter selected'}
                    </div>
                </div>
                <div className="modal-header bg-primary text-white">
                    <span>alldata Filter</span>
                    <div
                        className={'bg-color2'}>{allData && activeFilterData?.id ? JSON.stringify(allData.filter(item => item.id === activeFilterData.id), null, 2) : 'no filter selected'}
                    </div>
                    <span onClick={closeForm} className="close">✖</span>
                </div>

                    <div className="modal-content">

                        <div className="form-row form-group">
                            <label>Filter name {activeFilterData?.id}</label>
                            <input id="filterName" className="input-field form-control" type="text"
                                   value={activeFilterData?.name}
                                   onChange={(e) => handleFormDataChange('name', e.target.value)}/>
                        </div>


                        <div className="form-row form-group">
                            <label> {activeFilterData?.criteria.length} Criteria</label>
                            <span className="criteria-container">
                            {activeFilterData?.criteria.map((criterion) => (
                                <div>
                                    <CriteriaRow
                                        index={criterion.id}
                                        key={criterion.id}
                                        setActiveFilterData={setActiveFilterData}
                                        activeFilterData={activeFilterData}
                                        filterCriteria={criterion}
                                        onRemove={handleRemoveCriteria}/>
                                </div>
                            ))}
                        </span>
                        </div>

                        <div className="form-row form-group text-center">
                            <button className="mx-auto btn btn-light" onClick={addFilterCriteriaRow}>+ Add Row</button>
                        </div>

                        <div className="form-row form-group">
                            <label className="form-label">Usage</label>
                            <div className="radio-group">
                                <label className="radio-label form-check">
                                    <input type="radio" name="selection" value="common"
                                           checked={activeFilterData?.selection === 'common'}
                                           onChange={() => handleFormDataChange('selection', 'common')}
                                           className="form-check-input"/>Common
                                </label>
                                <label className="radio-label form-check">
                                    <input type="radio" name="selection" value="rare"
                                           checked={activeFilterData?.selection === 'rare'}
                                           onChange={() => handleFormDataChange('selection', 'rare')}
                                           className="form-check-input"/>Rare
                                </label>
                                <label className="radio-label form-check">
                                    <input type="radio" name="selection" value="special"
                                           checked={activeFilterData?.selection === 'special'}
                                           onChange={() => handleFormDataChange('selection', 'special')}
                                           className="form-check-input"/>Special
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button onClick={saveForm} className="btn btn-footer btn-secondary">SAVE</button>
                        <button onClick={closeForm} className="btn btn-footer btn-secondary">CLOSE</button>
                    </div>
                </div>
            </div>
            );
            });

            export default FilterForm;
