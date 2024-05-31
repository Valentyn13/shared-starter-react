import { HttpMethod } from './http-method.type';

export type HttpOptions = {
    method: HttpMethod;
    payload: BodyInit | null;
    headers: Headers;
    withCredentials?: boolean;
};
