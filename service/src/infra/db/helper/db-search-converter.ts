import { FilterOperators, FilterValue, Primitive, SearchParams, SearchResult } from "@domain/protocols/index.js";
import {
    And, Between, Equal,
    type FindManyOptions, FindOperator, type FindOptionsOrder, type FindOptionsWhere,
    ILike, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not,
    type ObjectLiteral
} from "typeorm";

export interface DbSearchOptions<E> {
    searchFields?: (keyof E & string)[]
}

type OperatorKey = keyof FilterOperators;
type OperatorFactory = (value: never) => FindOperator<Primitive>;

const operatorMap: Record<OperatorKey, OperatorFactory> = {
    $eq: (value: Primitive) => Equal(value),
    $ne: (value: Primitive) => Not(Equal(value)),
    $gt: (value: Primitive) => MoreThan(value),
    $gte: (value: Primitive) => MoreThanOrEqual(value),
    $lt: (value: Primitive) => LessThan(value),
    $lte: (value: Primitive) => LessThanOrEqual(value),
    $between: ([from, to]: [Primitive, Primitive]) => Between(from, to),
    $in: (values: Primitive[]) => In(values),
    $nin: (values: Primitive[]) => Not(In(values)),
};

export class DbSearchConverter {
    static toFindOptions<E extends ObjectLiteral>(
        params: SearchParams<E>,
        options: DbSearchOptions<E> = {}
    ): FindManyOptions<E> {
        const where = this.toWhere(params, options);

        return {
            where,
            order: params.order as FindOptionsOrder<E>,
            skip: (params.page - 1) * params.size,
            take: params.size,
        };
    }

    static toResult<T>(data: T[], totalItems: number, params: SearchParams<unknown>): SearchResult<T> {
        return {
            currentPage: params.page,
            size: params.size,
            totalPages: Math.ceil(totalItems / params.size),
            totalItems,
            data,
        };
    }

    private static toWhere<E extends ObjectLiteral>(
        params: SearchParams<E>,
        { searchFields = [] }: DbSearchOptions<E>
    ): FindOptionsWhere<E> | FindOptionsWhere<E>[] {
        const where: Record<string, FindOperator<Primitive>> = {};

        for (const [field, value] of Object.entries(params.filter ?? {})) {
            if (value === undefined) {
                continue;
            }
            where[field] = this.toOperator(value as FilterValue);
        }

        const search = params.search?.trim();
        if (!search || searchFields.length === 0) {
            return where as FindOptionsWhere<E>;
        }

        // Cada campo pesquisável vira um bloco do OR, mantendo os filtros em todos eles.
        const like = ILike(`%${this.escapeLike(search)}%`);
        return searchFields.map((field) => ({
            ...where,
            [field]: where[field] ? And(where[field], like) : like,
        })) as FindOptionsWhere<E>[];
    }

    private static toOperator(value: FilterValue): FindOperator<Primitive> {
        if (!this.isOperators(value)) {
            return Equal(value);
        }

        const operators = Object.entries(value)
            .filter(([, operand]) => operand !== undefined)
            .map(([key, operand]) => {
                const factory = operatorMap[key as OperatorKey] as ((operand: unknown) => FindOperator<Primitive>) | undefined;
                if (!factory) {
                    throw new Error(`Unsupported filter operator: ${key}`);
                }
                return factory(operand);
            });

        return operators.length === 1 ? operators[0]! : And(...operators);
    }

    private static isOperators(value: FilterValue): value is FilterOperators {
        return typeof value === "object" && value !== null && !(value instanceof Date);
    }

    private static escapeLike(value: string): string {
        return value.replace(/[\\%_]/g, "\\$&");
    }
}
