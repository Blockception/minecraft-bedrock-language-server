export declare class DataCache<K, V> {
    private _data;
    private _maxdiff;
    constructor(max_timespan?: number);
    get(key: K): V | undefined;
    getOrAdd(key: K, generate: (key: K) => V): V;
    set(key: K, value: V): DataCache<K, V>;
    clear(): void;
    private toOld;
}
export declare namespace DataCache {
    const defaultTimespan: number;
    function timespan(ms: number, seconds?: number, minutes?: number, hours?: number): number;
}
//# sourceMappingURL=data-cache.d.ts.map