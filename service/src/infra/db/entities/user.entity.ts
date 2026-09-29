import {
    Column, DeleteDateColumn,
    Entity, Index, JoinTable, ManyToMany, type Relation
} from "typeorm";

import { AbstractEntity } from "./abstract-entity.js";
import { Role } from "./role.entity.js";
import { Tenant } from "./tenant.entity.js";

@Entity({ name: "users" })
@Index("uq_users_username_not_deleted", ["username"], {
    unique: true,
    where: "\"deleted_at\" IS NULL",
})
export class User extends AbstractEntity {

  @Column({ name: "name", type: "varchar" })
      name!: string;

  @Column({ name: "username", type: "varchar" })
      username!: string;

  @Column({ name: "email", type: "varchar" })
      email!: string;

  @Column({ name: "password", type: "varchar", select: false })
      password!: string;

  @Column({ name: "is_active", type: "boolean", default: true })
      isActive!: boolean;

  @Column({ name: "is_blocked", type: "boolean", default: false })
      isBlocked!: boolean;

    @Column({ name: "is_admin", type: "boolean", default: false })
        isAdmin!: boolean;

  @Column({ name: "verified_at", type: "timestamptz", nullable: true })
      verifiedAt!: Date | null;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
      name: "user_roles",
      joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
          foreignKeyConstraintName: "fk_user_roles_user_id",
      },
      inverseJoinColumn: {
          name: "role_id",
          referencedColumnName: "id",
          foreignKeyConstraintName: "fk_user_roles_role_id",
      },
  })
      roles?: Relation<Role[]>;

  @ManyToMany(() => Tenant, (tenant) => tenant.users)
  @JoinTable({
      name: "user_tenants",
      joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
          foreignKeyConstraintName: "fk_user_tenants_user_id",
      },
      inverseJoinColumn: {
          name: "tenant_id",
          referencedColumnName: "id",
          foreignKeyConstraintName: "fk_user_tenants_tenant_id",
      },
  })
      tenants?: Relation<Tenant[]>;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true, select: false })
      deletedAt?: Date | null;
}