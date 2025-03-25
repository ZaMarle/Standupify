import ICreateUserForm from '../interfaces/ICreateUserForm';

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export default class ApiClient {
    private baseUrl: string;

    constructor() {
        if (!process.env.VEVOUS_API_BASE_URL) {
            throw new Error('Env variable not defined: VEVOUS_API_BASE_URL');
        }

        this.baseUrl = process.env.VEVOUS_API_BASE_URL;
    }

    private async request<T>(
        endpoint: string,
        method: RequestMethod,
        body?: string,
    ): Promise<T> {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            throw new Error(`error{}`);
        }

        return res.json();
    }

    users = {
        create: (user: ICreateUserForm) =>
            this.request('/users', RequestMethod.POST, user.toString()),
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
