import { HttpOptions } from '../../constants/types/http-options.type.ts';

export class HTTP {
    public load(path: string, options: HttpOptions): Promise<Response> {
        const { method, payload, headers, withCredentials } = options;

        return fetch(path, {
            method,
            headers,
            body: payload,
            credentials: withCredentials ? 'include' : 'same-origin',
        });
    }
}
