export default class {
    id: number;
    name: string;
    description: string;
    createdById: number;
    createdDate: Date;

    constructor(
        id: number,
        name: string,
        description: string,
        createdById: number,
        createdDate: Date,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdById = createdById;
        this.createdDate = createdDate;
    }
}
