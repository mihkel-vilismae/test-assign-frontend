export class Criterion {
    constructor(id, type, comparator, value) {
        this.id = id;
        this.type = type;
        this.comparator = comparator;
        this.value = value;
    }
}

export class ActiveFilter {
    constructor(id, name, selection, criteria) {
        this.id = id
        this.name = name
        this.selection = selection
        this.criteria = criteria
    }
}

//get default values for criterion
export function getDefaultCriterion() {
    return new Criterion(Date.now(), 'amount', 'more', '');
}

export function getDefaultActiveFilter() {
    return new ActiveFilter(Date.now(), '', 'common', []);
}

export default Criterion;
