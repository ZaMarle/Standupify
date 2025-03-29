import ICreateTeamForm from '../interfaces/ICreateTeamForm';
import ICreateUserForm from '../interfaces/ICreateUserForm';
import { ok, err, Result } from '../utils/Result';

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export default class ApiClient {
    private baseUrl: string;

    constructor() {
        if (!import.meta.env.VITE_VEVOUS_API_BASE_URL) {
            throw new Error('Env variable not defined: VEVOUS_API_BASE_URL');
        }

        this.baseUrl = import.meta.env.VITE_VEVOUS_API_BASE_URL;
    }

    private async request(
        endpoint: string,
        method: RequestMethod,
        body?: string,
    ): Promise<Response> {
        // try {
        const url = `${this.baseUrl}${endpoint}`;
        const query = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? body : undefined,
        };

        console.log(query);

        const res = await fetch(url, query);

        console.log(res);

        return res;

        //     return ok(await res.json());
        // } catch (e) {
        //     return err(`api request error: ${e}`);
        // }
    }

    users = {
        getTeams: (userId: number) =>
            this.request(`/users/${userId}/teams`, RequestMethod.GET),
        create: (user: ICreateUserForm) =>
            this.request(
                '/Users/Create',
                RequestMethod.POST,
                JSON.stringify(user),
            ),
    };

    teams = {
        create: (team: ICreateTeamForm) =>
            this.request('/teams', RequestMethod.POST, team.toString()),
    };

    // users = {
    //     getAll: () => this.request("/users", "GET"),
    //     getById: (id: number) => this.request(`/users/${id}`, "GET"),
    //     create: (user: { name: string; email: string }) => this.request("/users", "POST", user),
    //     update: (id: number, user: { name?: string; email?: string }) => this.request(`/users/${id}`, "PUT", user),
    //     delete: (id: number) => this.request(`/users/${id}`, "DELETE"),
    // };

    // posts = {
    //     getAll: () => this.request("/posts", "GET"),
    //     getById: (id: number) => this.request(`/posts/${id}`, "GET"),
    // };
}
