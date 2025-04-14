import React, { useEffect, useState } from 'react';
import * as Database from "../utils/Database";
import {debug} from "../utils/Debug";

function ExistingFilters({ onChooseFilter: setActiveFilterData, setAllData, allData }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleEdit = (filter) => {
        setActiveFilterData(filter);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(Database.getFiltersUrl());
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading filters...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }



    return (
        <table id="existing-filters" className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th>id</th>
                {debug && <th></th>}
                <th>Name</th>
                <th>Usage</th>
                <th>Criteria</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {allData.map((filter) => (
                <tr key={filter.id}>
                    <td>{filter.id}</td>
                    {debug && <td>{JSON.stringify(filter)}</td>}
                    <td>{filter.name}</td>
                    <td>{filter.selection}</td>
                    <td>
                        <ul className="list">
                            {(filter.criteria).map((criterion) => (
                                <li key={criterion.id}>
                                    {criterion.type} {criterion.comparator} {criterion.value}
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td>
                        <button onClick={() => handleEdit(filter)} className="btn btn-secondary">Edit</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ExistingFilters;