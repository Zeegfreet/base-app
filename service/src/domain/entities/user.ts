import type { BaseEntity } from "./base-entity.js";

export interface User extends BaseEntity {
    name: string;
    username: string;
    email: string;
    password?: string;
    isActive: boolean;
    isBlocked: boolean;
    verifiedAt: Date | null;
    deletedAt?: Date | null;
}
