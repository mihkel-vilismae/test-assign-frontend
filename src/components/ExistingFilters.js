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
        // Option 1: Use relative path
        fetch('/api/filters/get').then(r => logg(1, r, "1: Use relative path"))

// Option 2: Use localhost
        fetch('http://localhost/api/filters/get').then(r => logg(2, r, "r Option 2: Use localhost"))

// Option 3: If using a specific service name
        fetch('http://nginx/api/filters/get').then(r => logg(3, r, "Option 3: If using a specific service name"))

    },[]);

    function logg(i, respo,text) {
        console.error("------------d")
        console.error(i,text)
        console.error(respo)
        console.error("------------d")
    }

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