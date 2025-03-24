export default class Standup {
    id: number;
    createdBy: string;
    createdDate: Date;
    yesterday: string;
    today: string;
    blockers: string;

    constructor(
        id: number,
        createdBy: string,
        createdDate: Date,
        yesterday: string,
        today: string,
        blockers: string,
    ) {
        this.id = id;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.yesterday = yesterday;
        this.today = today;
        this.blockers = blockers;
    }
}
