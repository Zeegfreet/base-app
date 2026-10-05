import type { Primitive, PrimitiveKeys, SearchParams } from "@domain/protocols/index.js";
import { z } from "zod";

type FieldSchema<V extends Primitive> = z.ZodType<V>;

export type SearchFields<T> = {
    [K in PrimitiveKeys<T>]?: FieldSchema<Extract<T[K], Primitive>>
};

export interface SearchSchemaOptions {
    defaultSize?: number,
    maxSize?: number,
}

// Valores de query string chegam como texto, então cada campo precisa saber converter o seu tipo.
export const searchField = {
    string: () => z.string(),
    number: () => z.coerce.number(),
    date: () => z.coerce.date(),
    // z.coerce.boolean() trataria "false" como true.
    boolean: () => z.union([z.boolean(), z.enum(["true", "false"]).transform((value) => value === "true")]),
};

const sortDirection = z.string()
    .transform((value) => value.toUpperCase())
    .pipe(z.enum(["ASC", "DESC"]));

// Aceita tanto "a,b" quanto ["a", "b"].
const splitList = (value: unknown) => typeof value === "string" ? value.split(",") : value;

const filterValue = (field: z.ZodType) => {
    const list = z.preprocess(splitList, z.array(field).min(1));
    const operators = z.object({
        $eq: field,
        $ne: field,
        $gt: field,
        $gte: field,
        $lt: field,
        $lte: field,
        $between: z.preprocess(splitList, z.tuple([field, field])),
        $in: list,
        $nin: list,
    }).partial().strict();

    // Os operadores vêm antes: um schema com coerce aceitaria o objeto como "[object Object]".
    return z.union([operators, field]);
};

export const makeSearchSchema = <T>(
    fields: SearchFields<T>,
    { defaultSize = 10, maxSize = 100 }: SearchSchemaOptions = {}
): z.ZodType<SearchParams<T>> => {
    const entries = Object.entries(fields as Record<string, z.ZodType>);

    const order = z.object(Object.fromEntries(entries.map(([key]) => [key, sortDirection])))
        .partial()
        .strict();

    const filter = z.object(Object.fromEntries(entries.map(([key, schema]) => [key, filterValue(schema)])))
        .partial()
        .strict();

    // O shape é montado em runtime, então o tipo inferido pelo Zod é genérico demais.
    return z.object({
        page: z.coerce.number().int().min(1).default(1),
        size: z.coerce.number().int().min(1).max(maxSize).default(defaultSize),
        search: z.string().trim().min(1).optional(),
        order: order.optional(),
        filter: filter.optional(),
    }) as unknown as z.ZodType<SearchParams<T>>;
};
