import { IAuthContext } from '../components/AuthContext';
import ICreateStandupForm from '../interfaces/ICreateStandupForm';
import ICreateTeamForm from '../interfaces/ICreateTeamForm';
import ICreateUserForm from '../interfaces/ICreateUserForm';
import IFilterStandupsForm from '../interfaces/IFilterStandupsForm';
import ISignInForm from '../interfaces/ISignInForm';
import IQuery from './IQuery';
import { RequestMethod } from './RequestMethod';

let isRefreshing = false;
let refreshQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

export default class ApiClient {
    private _baseUrl: string;
    private _authContext: IAuthContext;

    constructor(authContext: IAuthContext) {
        if (!import.meta.env.VITE_VEVOUS_API_BASE_URL) {
            throw new Error('Env variable not defined: VEVOUS_API_BASE_URL');
        }

        this._baseUrl = import.meta.env.VITE_VEVOUS_API_BASE_URL;
        this._authContext = authContext;
    }

    private async request(
        endpoint: string,
        method: RequestMethod,
        body?: string,
    ): Promise<Response> {
        const url = `${this._baseUrl}${endpoint}`;
        const query: IQuery = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(this._authContext.token
                    ? { Authorization: `Bearer ${this._authContext.token.raw}` }
                    : {}),
            },
            credentials: 'include',
            body: body ? body : undefined,
        };

        console.log(query);

        const res = await fetch(url, query);
        if (res.status === 401) {
            return this.handleUnauthorized(url, query);
        }

        console.log(res);

        return res;
    }

    private async handleUnauthorized(url: string, query: IQuery) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            }).then((newToken) => {
                query.headers.Authorization = `Bearer ${newToken}`;
                return fetch(url, query);
            });
        }

        isRefreshing = true;

        try {
            const refreshUrl = `${this._baseUrl}/auth/refresh`;
            const refreshResponse = await fetch(refreshUrl, {
                method: 'POST',
                credentials: 'include',
            });

            if (!refreshResponse.ok) {
                throw new Error('Refresh token failed');
            }

            const data = await refreshResponse.json();
            this._authContext.signIn(data.accessToken);

            refreshQueue.forEach((promise) =>
                promise.resolve(data.accessToken),
            );
            refreshQueue = [];

            query.headers.Authorization = `Bearer ${data.accessToken}`;

            return fetch(`${url}`, query);
        } catch (error) {
            refreshQueue.forEach((promise) => promise.reject(error));
            refreshQueue = [];

            this._authContext.signOut();
            throw error;
        } finally {
            isRefreshing = false;
        }
    }

    auth = {
        signIn: (signInForm: ISignInForm) =>
            this.request(
                '/auth',
                RequestMethod.POST,
                JSON.stringify(signInForm),
            ),
    };

    standups = {
        get: (standupId: number) =>
            this.request(`/standups/${standupId}`, RequestMethod.GET),
        list: (data: IFilterStandupsForm) => {
            return this.request(
                `/standups/items?date=${data.date.toISOString()}&teams=[${data.teamIds.join(',')}]&users=[${data.userIds.join(',')}]`,
                RequestMethod.GET,
            );
        },
        create: (standup: ICreateStandupForm) =>
            this.request(
                '/standups',
                RequestMethod.POST,
                JSON.stringify(standup),
            ),
    };

    teams = {
        get: (teamId: number) =>
            this.request(`/teams/${teamId}`, RequestMethod.GET),
        getMembers: (teamIds: Array<number>) =>
            this.request(
                `/teams/members?teams=[${teamIds.join(',')}]`,
                RequestMethod.GET,
            ),
        create: (team: ICreateTeamForm) =>
            this.request('/teams', RequestMethod.POST, JSON.stringify(team)),
        delete: (teamId: number) =>
            this.request(`/teams/${teamId}`, RequestMethod.DELETE),
        removeUser: (userId: number) =>
            this.request(`/teams/${userId}/removeUser`, RequestMethod.GET),
        transferOwnership: (userId: number) =>
            this.request(
                `/teams/${userId}/transferOwnership`,
                RequestMethod.PUT,
            ),
    };

    users = {
        getTeams: (userId: number) =>
            this.request(`/users/${userId}/teams`, RequestMethod.GET),
        create: (user: ICreateUserForm) =>
            this.request(
                '/users/create',
                RequestMethod.POST,
                JSON.stringify(user),
            ),
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
