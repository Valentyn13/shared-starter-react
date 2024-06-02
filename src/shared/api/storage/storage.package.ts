import { StorageKey, ValueOf } from '../../constants/index.ts';

export class Storage {
    private store: globalThis.Storage;

    public constructor(store: globalThis.Storage) {
        this.store = store;
    }

    public set(key: ValueOf<typeof StorageKey>, value: string): Promise<void> {
        this.store.setItem(key as string, value);

        return Promise.resolve();
    }

    public get<R = string>(key: ValueOf<typeof StorageKey>): Promise<R | null> {
        return Promise.resolve(this.store.getItem(key as string) as R);
    }

    public drop(key: ValueOf<typeof StorageKey>): Promise<void> {
        this.store.removeItem(key as string);

        return Promise.resolve();
    }

    public async has(key: ValueOf<typeof StorageKey>): Promise<boolean> {
        const value = await this.get(key);

        return Boolean(value);
    }
}
