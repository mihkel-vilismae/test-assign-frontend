// ExistingFilters.js
import React, { useEffect, useState } from 'react';
import * as Database from './Database';
import {alertLog} from "./Database"; // Import your Database constants


function ExistingFilters({onDataChange: openFilterToEdit}) {
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);     // Add error state

    // Function to handle the "edit filter" button click
    const handleEdit = (filter) => {
        alertLog('handleEdit Edit filter with ID: ' + filter.id);
        openFilterToEdit(filter); // Call the callback function and pass the data
    };

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
                setFilters(data);
            } catch (error) {
                setError(error);  // Set the error state
            } finally {
                setLoading(false); // Set loading to false after fetching (regardless of success or failure)
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
        <table id="existing-filters">
            <thead>
            <tr>
                <th>Name</th>
                <th>Usage</th>
                <th>Criteria</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {filters.map((filter, index) => (
                <tr key={index}>
                    <td>{filter.name}</td>
                    <td>{filter.selection}</td>
                    <td>{filter.criteria.map((criterion) => (
                        <li key={criterion.id}>
                            {criterion.type} {criterion.comparator} {criterion.value}
                        </li>
                    ))}</td>
                    <td>
                        <button onClick={() => handleEdit(filter)}>Edit</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ExistingFilters;