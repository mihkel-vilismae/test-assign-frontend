import Criterion from "./Criterion";

export class Filter {
    constructor(id, name, selection, criteria) {
        this.id = id;
        this.name = name;
        this.selection = selection;
        this.criteria = criteria.map(c => new Criterion(c.id, c.type, c.comparator, c.value)); // Create Criterion objects
    }

}