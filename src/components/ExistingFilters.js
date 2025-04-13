// ExistingFilters.js
import React, { useEffect, useState } from 'react';
import * as Database from '../Database';
import {alertLog, criteria} from "../App";
export var hasData = false;
export var debug = false;

function ExistingFilters({onChooseFilter: setActiveFilterData,  setAllData, allData}) {
    const [filtersFromDb, setfiltersFromDb] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);     // Add error state

    // Function to handle the "edit filter" button click
    const handleEdit = (filter) => {

        //alertLog('handleEdit Edit filter with ID: ' + JSON.stringify(filter));
        //alertlog('handleEdit Edit filter with ID: ' + filter.id);
        setActiveFilterData(filter); // Call the callback function and pass the data
    };

    const handleDelete = async (filter) => {

    }

    // Fetch existing filters from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null);    // Clear any previous errors

            try {
                const response = await fetch(Database.GET);
                if (!response.ok) { // Check for HTTP errors
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (debug)
                alertLog('from db: ' + JSON.stringify(data))
                hasData = true;
                setfiltersFromDb(data);
                setAllData(data);
               // alertLog('ExistingFilters '+JSON.stringify(allData))
            } catch (error) {
                setError(error);  // Set the error state
            } finally {
                setLoading(false); // Set loading to false after fetching (regardless of success or failure)
             //   debug = true;
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading filters...</div>; // Display loading message
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

    return (
        <table id="existing-filters" className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th>id</th>
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
                    <td>{filter.name}</td>
                    <td>{filter.selection}</td>
                    <td>
                        <ul className="list-unstyled">
                            {filter.criteria.map((criterion) => (
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