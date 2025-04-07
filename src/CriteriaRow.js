import React from 'react';
import Criterion from './Entities/Criterion';

function CriteriaRow({ filterCriteria, index }) {
    alert("CriteriaRow: " + JSON.stringify(filterCriteria, null, 2));
    let isNewFilter = !filterCriteria;
    alert('isNewFilter: '+ isNewFilter + '  ' +  !filterCriteria);
    if (isNewFilter) {
        filterCriteria = new Criterion(null, 'amount', 'more', 0);
        alert("filterCriteria: " + JSON.stringify(filterCriteria, null, 2));
    }
    return (

                <div className="criteria-row" key={index}>
                    <select value={filterCriteria.type}>
                        <option value="amount">Amount</option>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>

                    {filterCriteria.type === 'amount' && (
                        <span>
                            <select value={filterCriteria.comparator}>
                                <option value="more">More</option>
                                <option value="less">Less</option>
                                <option value="equals">Equals</option>
                            </select>
                            <input type="number" value={filterCriteria.value} />
                        </span>
                    )}

                    {filterCriteria.type === 'title' && (
                        <span>
                            <select value={filterCriteria.comparator}>
                                <option value="more">More</option>
                                <option value="less">Less</option>
                                <option value="equals">Equals</option>
                            </select>
                            <input type="text" value={filterCriteria.value} />
                        </span>
                    )}

                    {filterCriteria.type === 'date' && (
                        <span>
                            <select value={filterCriteria.comparator}>
                                <option value="to">To</option>
                                <option value="from">From</option>
                                <option value="exactly">Exactly</option>
                            </select>
                            <input type="date" value={filterCriteria.date} />
                        </span>
                    )}
                    <span className="remove-criteria">✖</span>
                </div>

    );
}

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

export default CriteriaRow;