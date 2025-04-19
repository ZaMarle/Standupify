export default interface ICreateStandupForm {
    blockers: string;
    today: string;
    yesterday: string;
    teamIds: Array<number>;
    clientTz: string;
}
