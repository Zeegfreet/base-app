import { SearchUsers } from "@domain/use-cases/index.js";

import { makeSearchSchema, searchField } from "../searchSchema.js";

export const searchUsersSchema = makeSearchSchema<SearchUsers.Model>({
    id: searchField.number(),
    name: searchField.string(),
    username: searchField.string(),
    email: searchField.string(),
    isActive: searchField.boolean(),
    isBlocked: searchField.boolean(),
    verifiedAt: searchField.date(),
    createdAt: searchField.date(),
    updatedAt: searchField.date(),
});
