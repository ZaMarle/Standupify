import ICreateAccountForm from '../interfaces/ICreateAccountForm';

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
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
        create: (user: ICreateAccountForm) =>
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
