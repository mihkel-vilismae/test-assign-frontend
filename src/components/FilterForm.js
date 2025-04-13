import React, { useEffect, useRef, useState } from 'react';
import '../styles/FilterForm.css';
import ReactDOM from "react-dom/client";
import Criterion, { getDefaultCriterion } from '../Entities/Criterion';
import CriteriaRow from "./CriteriaRow";
import criterion from "../Entities/Criterion";
import {c} from "react/compiler-runtime";

const FilterForm = React.forwardRef(({setActiveFilterData, activeFilterData, filterData, onChange, allData, setAllData }, ref) => {
    const [filterName, setFilterName] = useState('');
    const [selection, setSelection] = useState('');
    const newFilterFormRef = useRef(null);
    const [form, setForm] = useState(null);

    const [criteriaContainer, setCriteriaContainer] = useState(null);
    const criteriaContainerRoot = useRef(null);
    const [criteria, setCriteria] = useState([]);

    const [internalFilterData, setInternalFilterData] = useState({});

    const [dataSet, setData] = useState(false);
    const [containerSet, setContainer] = useState(false);
/*  React.useEffect(() => {
        setInternalFilterData(filterData);
    }, [filterData]);

     React.useImperativeHandle(ref, () => ({
        getFilterData,
    }));
 */


    const getFilterData = () => {
        return internalFilterData;
    };

    const setFilterCriteria = (criteria) => {
        setCriteria(criteria);
    }

    const setFilterData = (data) => {
        setInternalFilterData([])
        setInternalFilterData(data);
        setCriteria(data.criteria);
    }

    useEffect(() => {
        /*const currentForm = newFilterFormRef.current;
        const currentCriteriaContainer = currentForm.querySelector('.criteria-container');
        const currentCriteriaContainerRoot = ReactDOM.createRoot(currentCriteriaContainer);

        setForm(currentForm);
        setCriteriaContainer(currentCriteriaContainer);
        criteriaContainerRoot.current = currentCriteriaContainerRoot;
       // setFilterCriteria(internalFilterData.criteria)
        setContainer(true);*/
    }, []);



    const handleFormInternalChange = (name, value) => {
        const updatedData = { ...internalFilterData, [name]: value };
        setInternalFilterData(updatedData);
        onChange(updatedData);
    };

    React.useImperativeHandle(ref, () => ({
        getFilterData, setFilterData, setFilterCriteria
    }));


/*
    useEffect(() => {
        showForm();
        populateForm(filterData);
    }, [filterData]);*/




    const handleRemoveCriteria = (id) => {
        alert(id)
        alert(JSON.stringify(activeFilterData))
        alert(JSON.stringify(activeFilterData.criteria))
        setCriteria(prevCriteria => prevCriteria.filter(criterion => criterion.id !== id));
        setAllData(...allData, criteria);
        alert(JSON.stringify(activeFilterData))
        alert(JSON.stringify(activeFilterData.criteria))
    };

    function showForm() {
        emptyForm();
        if (form) {
            form.setAttribute('style', 'display: block;');
        }
    }

    function closeForm() {
        emptyForm();
    }

    function emptyForm() {
        setFilterName('');
        setCriteria([]);
    }

    /*useEffect(() => {
        if (criteriaContainerRoot.current) {
            const criteriaRows = criteria.map((criterion) => (
                <CriteriaRow
                    filterCriteria={criterion}
                    key={criterion.id}
                    index={criterion.id}
                    onRemove={handleRemoveCriteria}
                    onChange={() => {  alert('FilterForm -> onChange:'); }}
                />
            ));
            criteriaContainerRoot.current.render(criteriaRows);
        }
    }, [criteria]);*/

//--------------------------------------------
    useEffect(() => {
        alert('alldata cjange')
        //setAllData({ ...allData, [criteria]: criteria });
    }   , [allData]);
   // alert('neew crit: '+JSON.stringify({ ...allData, [criteria]: criteria }))

    useEffect(() => {
        alert('setActiveFilterData' +JSON.stringify(activeFilterData))
        setActiveFilterData(activeFilterData);
    }, [activeFilterData]);

   //const [allData, setAllData] = useState(allData);
    function addFilterCriteriaRow() {
        const newCriterion = getDefaultCriterion();
        setCriteria([...criteria, newCriterion]);
    }

    const handleFormDataChange = (name, value) => {
        setAllData({ ...allData, [name]: value });
        alert('Form:handleFormDataChange : '+JSON.stringify({ ...allData, [name]: value }))

    };

    return (
        <div className="new-filter-form" id={"new-filter-form"} ref={newFilterFormRef}>
            <div className="filter-modal modal-dialog">
                <div className="modal-header bg-primary text-white">
                    <span>Filter</span>
                    <span>{0 && filterData ? <pre>{JSON.stringify(filterData, null, 2)}</pre> : 'no filter selected'}</span>
                    <span onClick={closeForm} className="close">✖</span>
                </div>

                <div className="modal-content">

                    <div className="form-row form-group">
                        <label>Filter name</label>
                        <input id="filterName" className="input-field form-control" type="text"  value={activeFilterData?.name}
                               onChange={(e) => handleFormDataChange('name', e.target.value)}/>
                    </div>


                    <div className="form-row form-group">
                        <label> {activeFilterData?.criteria.length} Criteria</label>
                        <span className="criteria-container">
                            {activeFilterData?.criteria.map((criterion) => (
                                <div>
                                    {JSON.stringify(criterion)}
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
                                <input type="radio" name="selection" value="common" checked={activeFilterData?.selection === 'common'}
                                       onChange={() => handleFormDataChange('selection', 'common')} className="form-check-input"/>Common
                            </label>
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="rare" checked={activeFilterData?.selection === 'rare'}
                                       onChange={() => handleFormDataChange('selection', 'rare')} className="form-check-input"/>Rare
                            </label>
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="special" checked={activeFilterData?.selection === 'special'}
                                       onChange={() => handleFormDataChange('selection', 'special')} className="form-check-input"/>Special
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={closeForm} className="btn btn-secondary">CLOSE</button>
                </div>
            </div>
        </div>
    );
});

export default FilterForm;
