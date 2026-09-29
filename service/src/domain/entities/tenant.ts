import type { BaseEntity } from "./base-entity.js";

export interface Tenant extends BaseEntity {
    name: string;
    slug: string;
    document: string | null;
    email: string | null;
    isActive: boolean;
    deletedAt?: Date | null;
}
