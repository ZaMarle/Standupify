type Ok<T> = { kind: 'ok'; value: T };
type Err<E> = { kind: 'err'; error: E };

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): Result<T, never> {
    return { kind: 'ok', value };
}

export function err<E>(error: E): Result<never, E> {
    return { kind: 'err', error };
}
