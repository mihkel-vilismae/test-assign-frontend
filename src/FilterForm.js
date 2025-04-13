import React, { useEffect, useRef, useState } from 'react';
import './FilterForm.css';
import ReactDOM from "react-dom/client";
import Criterion, { getDefaultCriterion } from './Entities/Criterion';
import CriteriaRow from "./CriteriaRow";

const FilterForm = React.forwardRef(({ filterData, onChange }, ref) => {
    const [filterName, setFilterName] = useState('');
    const [selection, setSelection] = useState('');
    const newFilterFormRef = useRef(null);
    const [form, setForm] = useState(null);

    const [criteriaContainer, setCriteriaContainer] = useState(null);
    const criteriaContainerRoot = useRef(null);
    const [criteria, setCriteria] = useState([]);

    const [internalFilterData, setInternalFilterData] = useState({});

    React.useEffect(() => {
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
        const currentForm = newFilterFormRef.current;
        const currentCriteriaContainer = currentForm.querySelector('.criteria-container');
        const currentCriteriaContainerRoot = ReactDOM.createRoot(currentCriteriaContainer);

        setForm(currentForm);
        setCriteriaContainer(currentCriteriaContainer);
        criteriaContainerRoot.current = currentCriteriaContainerRoot;
       // setFilterCriteria(internalFilterData.criteria)
        setContainer(true);
    }, []);

    useEffect(() => {
        if (criteriaContainerRoot.current) {
            alert('FilterForm -> criteria:', criteria);
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
    }, [criteria]);
    }, [containerSet, criteria]);



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




    const handleRemoveCriteria = (index) => {
        setCriteria(prevCriteria => prevCriteria.filter(criterion => criterion.id !== index));
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

    function addFilterCriteriaRow() {
        const newCriterion = getDefaultCriterion();
        setCriteria([...criteria, newCriterion]);
    }

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
                        <input id="filterName" className="input-field form-control" type="text" value={internalFilterData?.name}
                               onChange={(e) => handleFormInternalChange('name', e.target.value)}/>
                    </div>

                    <div className="form-row form-group">
                        <label>Criteria</label>
                        <span className="criteria-container"></span>
                    </div>

                    <div className="form-row form-group text-center">
                        <button className="mx-auto btn btn-light" onClick={addFilterCriteriaRow}>+ Add Row</button>
                    </div>

                    <div className="form-row form-group">
                        <label className="form-label">Usage</label>
                        <div className="radio-group">
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="common" checked={internalFilterData?.selection === 'common'}
                                       onChange={() => handleFormInternalChange('selection', 'common')} className="form-check-input"/>Common
                            </label>
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="rare" checked={internalFilterData?.selection === 'rare'}
                                       onChange={() => handleFormInternalChange('selection', 'rare')} className="form-check-input"/>Rare
                            </label>
                            <label className="radio-label form-check">
                                <input type="radio" name="selection" value="special" checked={internalFilterData?.selection === 'special'}
                                       onChange={() => handleFormInternalChange('selection', 'special')} className="form-check-input"/>Special
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
