import React, { useState, useEffect } from 'react';
import { getDefaultCriterion } from '../Entities/Criterion';

function CriteriaRow({ setActiveFilterData, activeFilterData, filterCriteria, index, onChange, onRemove, id, allData,setAllData }) {
    //alertlog('CriteriaRow: ->'+JSON.stringify(filterCriteria));
    const [criterion, setCriterion] = useState(() => filterCriteria || getDefaultCriterion());

    useEffect(() => {
        //setCriterion(filterCriteria || getDefaultCriterion());
        setCriterion(filterCriteria );
    }, [filterCriteria]);

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        const updatedCriterion = { ...criterion, type: newType, value: '' };

        setActiveFilterData((prevData) => ({
            ...prevData,
            criteria: prevData.criteria.map((prevCrit) => (prevCrit.id === updatedCriterion.id ? updatedCriterion : prevCrit)),
        }));
    };

    const handleComparatorChange = (event) => {
        const newComparator = event.target.value;
        const updatedCriterion = { ...criterion, comparator: newComparator };
        setCriterion(updatedCriterion);

        setActiveFilterData((prevData) => ({
            ...prevData,
            criteria: prevData.criteria.map((prevCrit, i) => (prevCrit.id === updatedCriterion.id ? updatedCriterion : prevCrit)),
        }));
    };

    const handleValueChange = (event) => {
        const newValue = event.target.value;
        const updatedCriterion = { ...criterion, value: newValue  };
        setCriterion(updatedCriterion);

        setActiveFilterData((prevData) => ({
            ...prevData,
            criteria: prevData.criteria.map((prevCrit, i) => (prevCrit.id === updatedCriterion.id ? updatedCriterion : prevCrit)),
        }));
    };

    function amountSelectionCode() {
        return (
            <span className="">
                    <select
                        className="criteria-select input-field"
                        value={criterion.comparator}
                        onChange={handleComparatorChange}
                    >
                        <option value="more">More</option>
                        <option value="less">Less</option>
                        <option value="equals">Equals</option>
                    </select>
                    <input
                        className="criteria-input input-field"
                        type="number"
                        value={criterion.value}
                        onChange={handleValueChange}
                    />
                </span>
        );
    }

    function titleSelectionCode() {
        return (
            <span className="">
                    <select
                        className="criteria-select input-field"
                        value={criterion.comparator}
                        onChange={handleComparatorChange}
                    >
                        <option value="starts_with">Starts with</option>
                        <option value="ends_with">Ends with</option>
                        <option value="contains">Contains</option>
                    </select>
                    <input
                        className="criteria-input input-field"
                        type="text"
                        value={criterion.value}
                        onChange={handleValueChange}
                    />
                </span>
        );
    }

    function dateSelectionCode() {
        return (
            <span className="">
                    <select
                        className="criteria-select input-field"
                        value={criterion.comparator}
                        onChange={handleComparatorChange}
                    >
                        <option value="to">To</option>
                        <option value="from">From</option>
                        <option value="exactly">Exactly</option>
                    </select>
                    <input
                        className="criteria-input input-field"
                        type="date"
                        value={criterion.value}
                        onChange={handleValueChange}
                    />
                </span>
        );
    }

    const getTypeComparators = () => {
        switch (criterion.type) {
            case 'amount':
            default:
                return amountSelectionCode();
            case 'title':
                return titleSelectionCode()
            case 'date':
                return dateSelectionCode();
        }
    };

    /*
    //generateCriterionFromRow is used to generate the criterion object from the current row state
    const generateCriterionFromRow = () => {
        return {
            id: criterion.id,
            type: criterion.type,
            comparator: criterion.comparator,
            value: criterion.value
        };
    };*/

    const handleRemove = () => {
        console.log(`Removing criterion at index ${index}:`, criterion);
        onRemove(criterion.id);
    };

    return (
        <div className="criteria-row">
            <select className="criteria-select input-field" id={criterion.id} value={criterion.type} onChange={handleTypeChange}>
                <option value="amount">Amount</option>
                <option value="title">Title</option>
                <option value="date">Date</option>
            </select>

            {getTypeComparators()}

            <span className="remove-criteria" onClick={handleRemove}>✖</span>
        </div>
    );
}

export default CriteriaRow;
