export class Criterion {
    constructor(id, type, comparator, value) {
        this.id = id;
        this.type = type;
        this.comparator = comparator;
        this.value = value;
    }
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

export default  Criterion;