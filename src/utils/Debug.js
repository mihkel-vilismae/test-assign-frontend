import React from "react";

export var debug = false;
export const showAlert = false;

export function activeFilterNoCriteriaDebug(activeFilterData) {
    return <div className="modal-header bg-primary text-white">
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
    </div>;
}

export function activeFilterCriteriaDebug(activeFilterData) {
    return <div className="modal-header bg-primary text-white">
        <span>activeFilter Criteria</span>
        <div className="bg-color2">
            {activeFilterData
                ? JSON.stringify(activeFilterData.criteria, null, 2)
                : 'no filter selected'}
        </div>
    </div>
}

export function commitedFiltersDebug(allData, activeFilterData) {
    return <div className="modal-header bg-primary text-white">
        <span>Alldata Filter</span>
        <div className="bg-color2">
            {allData && activeFilterData?.id
                ? JSON.stringify(allData.filter((item) => item.id === activeFilterData.id), null, 2)
                : 'no filter selected'}
        </div>

    </div>
}