export type Primitive = string | number | boolean | Date;

export type SortDirection = "ASC" | "DESC";

export interface FilterOperators<V extends Primitive = Primitive> {
    $eq?: V,
    $ne?: V,
    $gt?: V,
    $gte?: V,
    $lt?: V,
    $lte?: V,
    $between?: [V, V],
    $in?: V[],
    $nin?: V[],
}

export type FilterValue<V extends Primitive = Primitive> = V | FilterOperators<V>;

export type PrimitiveKeys<T> = {
    [K in keyof T]-?: T[K] extends Primitive | null | undefined ? K : never
}[keyof T];

export interface SearchParams<T = Record<string, Primitive>> {
    page: number,
    size: number,
    search?: string,
    order?: Partial<Record<PrimitiveKeys<T>, SortDirection>>,
    filter?: { [K in PrimitiveKeys<T>]?: FilterValue<Extract<T[K], Primitive>> },
}

export interface SearchResult<T> {
    data: T[],
    currentPage: number,
    size: number,
    totalPages: number,
    totalItems: number,
}
