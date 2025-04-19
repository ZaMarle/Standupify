import { Dayjs } from 'dayjs';

export default interface IFilterStandupsForm {
    date: Dayjs;
    teamIds: Array<number>;
    userIds: Array<number>;
}
