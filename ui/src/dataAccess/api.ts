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

    private async request<T>(
        endpoint: string,
        method: RequestMethod,
        body?: string,
    ): Promise<Result<T, string>> {
        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : undefined,
            });

            return ok(await res.json());
        } catch (e) {
            return err(`api request error: ${e}`);
        }
    }

    users = {
        create: (user: ICreateUserForm) =>
            this.request('/users', RequestMethod.POST, user.toString()),
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
