import {
    ApiEndpoints,
    ContentType,
    HTTP,
    HttpApi,
    Storage,
} from '../../shared/index.ts';

type Constructor = {
    baseUrl: string;
    http: HTTP;
    storage: Storage;
};
type ExampleApiResponseDto = {
    exampleData: string;
};
export class ExampleApi extends HttpApi {
    constructor({ baseUrl, http, storage }: Constructor) {
        super({ baseUrl, http, storage });
    }

    public async getPositions() {
        const response = await this.load(
            this.getFullEndpoint(ApiEndpoints.POSITIONS),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<ExampleApiResponseDto>();
    }
}
