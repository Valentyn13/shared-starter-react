import Cookies from 'js-cookie';

import {
    ContentType,
    CookieName,
    HttpApiOptions,
    HttpApiResponse,
    HttpHeader,
    StorageKey,
    ValueOf,
} from '../../constants/index.ts';
import { HTTP } from '../http/http.package';
import { Storage } from '../storage/storage.package.ts';

export class HttpApi {
    private baseUrl: string;
    private storage: Storage;
    private http: HTTP;

    constructor({
        baseUrl,
        storage,
        http,
    }: {
        baseUrl: string;
        storage: Storage;
        http: HTTP;
    }) {
        this.baseUrl = baseUrl;
        this.storage = storage;
        this.http = http;
    }

    public async load(
        path: string,
        options: HttpApiOptions,
    ): Promise<HttpApiResponse> {
        const {
            method,
            contentType,
            payload = null,
            hasAuth,
            withCredentials = false,
        } = options;

        const headers = await this.getHeaders(contentType, hasAuth);

        const response = await this.http.load(path, {
            method,
            headers,
            payload,
            withCredentials,
        });

        return response;
    }

    private async getHeaders(
        contentType: ValueOf<typeof ContentType>,
        hasAuth: boolean,
    ): Promise<Headers> {
        const headers = new Headers();

        if (contentType !== ContentType.FORM_DATA) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }

        if (hasAuth) {
            const tokenFromLocalStorage = await this.storage.get<string>(
                StorageKey.TOKEN,
            );

            const tokenFromCookie = Cookies.get(CookieName.TOKEN);
            const token = tokenFromLocalStorage ?? tokenFromCookie;
            headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
        }

        return headers;
    }

    protected getFullEndpoint(path: string): string {
        return `${this.baseUrl}${path}`;
    }
}
