import { RequestMethod } from './RequestMethod';

export default interface IQuery {
    method: RequestMethod;
    headers: {
        Authorization?: string | undefined;
        'Content-Type': string;
    };
    credentials: RequestCredentials;
    body: string | undefined;
}
