import { ContentType } from '../enums/content-type.enum.ts';

import { type HttpOptions } from './http-options.type.ts';
import { type ValueOf } from './value-of.type.ts';

export type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    hasAuth: boolean;
    contentType: ValueOf<typeof ContentType>;
    payload?: HttpOptions['payload'];
    withCredentials?: boolean;
};
