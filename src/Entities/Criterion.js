export class Criterion {
    constructor(id, type, comparator, value) {
        this.id = id;
        this.type = type;
        this.comparator = comparator;
        this.value = value;
    }
}

//get default values for criterion
export function getDefaultCriterion() {
    return new Criterion(Date.now(), 'amount', 'more', '');
}

export function getTypeComparator(type) {
    switch (type) {
        case 'amount':
        default:
            return ['more', 'less', 'equals'];
        case 'title':
            return ['starts_with', 'contains', 'ends_with'];
        case 'date':
            return ['to', 'from', 'exactly'];
    }
}

export default Criterion;
