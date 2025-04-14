import React, { useEffect, useRef, useState } from 'react';
import '../styles/FilterForm.css';
import { getDefaultActiveFilter, getDefaultCriterion } from '../Entities/DataObjects';
import CriteriaRow from './CriteriaRow';
import { alertLog } from '../App';

const FilterForm = React.forwardRef(({
                                         setActiveFilterData,
                                         activeFilterData,
                                         onClose,
                                         allData,
                                         setAllData
                                     }, ref) => {
    const newFilterFormRef = useRef(null);

    const handleRemoveCriteria = (id) => {
        setActiveFilterData((prevData) => ({
            ...prevData,
            criteria: prevData.criteria.filter((criterion) => criterion.id !== id),
        }));
    };

    const addFilterCriteriaRow = () => {
        const newCriterion = getDefaultCriterion();
        const updatedCriteria = [...activeFilterData.criteria, newCriterion];
        setActiveFilterData({ ...activeFilterData, criteria: updatedCriteria });
    };

    const saveActiveFilter = (newData) => {
        const filterId = newData.id;
        const isNew = !allData.some((filter) => filter.id === filterId);

        setAllData((prevAllData) => {
            if (isNew) {
                return [...prevAllData, newData];
            }
            return prevAllData.map((filter) =>
                filter.id === filterId ? { ...filter, ...newData } : filter
            );
        });
    };

    const handleFormDataChange = (name, value) => {
        setActiveFilterData({ ...activeFilterData, [name]: value });
    };

    return (
        <div className="new-filter-form" id="new-filter-form" ref={newFilterFormRef}>
            <div className="filter-modal modal-dialog">
                <div className="modal-header bg-primary text-white">
                    <span>activeFilter Fields</span>
                    <div className="bg-color1">
                        {activeFilterData
                            ? JSON.stringify(
                                Object.fromEntries(
                                    Object.entries(activeFilterData).filter(([key]) => key !== 'criteria')
                                ),
                                null,
                                2
                            )
                            : 'no filter selected'}
                    </div>
                </div>
                <div className="modal-header bg-primary text-white">
                    <span>activeFilter Criteria</span>
                    <div className="bg-color2">
                        {activeFilterData
                            ? JSON.stringify(activeFilterData.criteria, null, 2)
                            : 'no filter selected'}
                    </div>
                </div>
                <div className="modal-header bg-primary text-white">
                    <span>alldata Filter</span>
                    <div className="bg-color2">
                        {allData && activeFilterData?.id
                            ? JSON.stringify(allData.filter((item) => item.id === activeFilterData.id), null, 2)
                            : 'no filter selected'}
                    </div>
                    <span onClick={onClose} className="close">✖</span>
                </div>

                <div className="modal-content">
                    <div className="form-row form-group">
                        <label>Filter name {activeFilterData?.id}</label>
                        <input
                            id="filterName"
                            className="input-field form-control"
                            type="text"
                            value={activeFilterData?.name}
                            onChange={(e) => handleFormDataChange('name', e.target.value)}
                        />
                    </div>

                    <div className="form-row form-group">
                        <label>{activeFilterData?.criteria.length} Criteria</label>
                        <span className="criteria-container">
                            {activeFilterData?.criteria.map((criterion) => (
                                <div key={criterion.id}>
                                    <CriteriaRow
                                        index={criterion.id}
                                        setActiveFilterData={setActiveFilterData}
                                        activeFilterData={activeFilterData}
                                        filterCriteria={criterion}
                                        onRemove={handleRemoveCriteria}
                                    />
                                </div>
                            ))}
                        </span>
                    </div>

                    <div className="form-row form-group text-center">
                        <button className="mx-auto btn btn-light" onClick={addFilterCriteriaRow}>
                            + Add Row
                        </button>
                    </div>

                    <div className="form-row form-group">
                        <label className="form-label">Usage</label>
                        <div className="radio-group">
                            <label className="radio-label form-check">
                                <input
                                    type="radio"
                                    name="selection"
                                    value="common"
                                    checked={activeFilterData?.selection === 'common'}
                                    onChange={() => handleFormDataChange('selection', 'common')}
                                    className="form-check-input"
                                />
                                Common
                            </label>
                            <label className="radio-label form-check">
                                <input
                                    type="radio"
                                    name="selection"
                                    value="rare"
                                    checked={activeFilterData?.selection === 'rare'}
                                    onChange={() => handleFormDataChange('selection', 'rare')}
                                    className="form-check-input"
                                />
                                Rare
                            </label>
                            <label className="radio-label form-check">
                                <input
                                    type="radio"
                                    name="selection"
                                    value="special"
                                    checked={activeFilterData?.selection === 'special'}
                                    onChange={() => handleFormDataChange('selection', 'special')}
                                    className="form-check-input"
                                />
                                Special
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={() => saveActiveFilter(activeFilterData)} className="btn btn-footer btn-secondary">
                        SAVE
                    </button>
                    <button onClick={onClose} className="btn btn-footer btn-secondary">
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
});

export default FilterForm;