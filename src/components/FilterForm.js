import React, {useState} from 'react';
import '../styles/FilterForm.css';
import {getDefaultActiveFilter, getDefaultCriterion} from '../entities/DataObjects';
import CriteriaRow from './CriteriaRow';
import {activeFilterCriteriaDebug, activeFilterNoCriteriaDebug, commitedFiltersDebug, debug} from "../utils/Debug";
import * as Database from "../utils/Database";

function FilterForm({
                        setActiveFilterData,
                        activeFilterData,
                        onClose,
                        allData,
                        setAllData
                    }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleRemoveCriteria = (id) => {
        setActiveFilterData((prevData) => ({
            ...prevData,
            criteria: prevData.criteria.filter((criterion) => criterion.id !== id),
        }));
    };

    const addFilterCriteriaRow = () => {
        const newCriterion = getDefaultCriterion();
        const updatedCriteria = [...activeFilterData.criteria, newCriterion];
        setActiveFilterData({...activeFilterData, criteria: updatedCriteria});
    };

    const saveActiveFilter = (newData) => {
        const filterId = newData.id;
        const isNew = newData.id === null;

        if (isNew) {
            newData.isNew = true;
        } else
            setAllData((prevAllData) => {
                return prevAllData.map((filter) =>
                    filter.id === filterId ? {...filter, ...newData} : filter
                );
            });
        alert(JSON.stringify(newData))
        saveDataToDatabase(newData).then(r => console.log(r));
    };

    const handleFormDataChange = (name, value) => {
        setActiveFilterData({...activeFilterData, [name]: value});
    };

    const saveDataToDatabase = async (filterData) => {
        setActiveFilterData(filterData);
        setLoading(true);
        setError(null);
        console.log(filterData)
        const isCreate = filterData.id === null;
        const isUpdate = !isCreate;
        const url = isCreate ? Database.getCreateUrl() : Database.getUpdateUrl(filterData.id);
        alert(url)
        fetch(url, {
            method: isCreate ? 'POST' : 'PUT',
            //mode: 'no-cors',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filterData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((resultFilter) => {
                console.log('resultFilter',resultFilter)

                if (!Array.isArray(resultFilter.criteria))
                    resultFilter.criteria=Array.from(resultFilter.criteria)

                if (isCreate)
                    setAllData((prevAllData) => {
                        return [...prevAllData, resultFilter]
                    });
                else if (isUpdate) {
                    // find specific filter with id=result.id from alldata
                  //  const existingFilter = allData.find((filter) => filter.id === resultFilter.id);
                    //existingFilter = resultFilter;
                }
                setActiveFilterData(resultFilter);
                console.log(resultFilter)

                return resultFilter;
            })
            .catch((error) => {
                console.error('Error saving data:', error);
                setError(error);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteFilter = async (filterToDelete) => {
        setLoading(true);
        setError(null);
        const url = Database.getDeleteUrl(filterToDelete.id);
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
                }
                setActiveFilterData(getDefaultActiveFilter());
                removeFilterFromAllData(filterToDelete);
                return true;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    function removeFilterFromAllData(filterToRemove) {
        setAllData(allData.filter((filterData) => filterData.id !== filterToRemove.id));
    }


    return (
        <div className="new-filter-form" id="new-filter-form">
            <div className="filter-modal modal-dialog">
                {debug && (
                    <>
                        {activeFilterNoCriteriaDebug(activeFilterData)}
                        {activeFilterCriteriaDebug(activeFilterData)}
                        {commitedFiltersDebug(allData, activeFilterData)}
                    </>
                )}
                <div className="modal-content">
                    <div className="form-row form-group">
                        <label>Filter name {debug ? activeFilterData?.id : ""}</label>
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
                        {activeFilterData.id === null ? 'SAVE' : 'UPDATE'}
                    </button>
                    {activeFilterData.id !== null && (
                        <>
                            <button onClick={() => deleteFilter(activeFilterData).then(() => onClose)}
                                    className="btn btn-footer btn-secondary">
                                DELETE
                            </button>
                        </>
                    )}
                    <button onClick={onClose} className="btn btn-footer btn-secondary">
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterForm;