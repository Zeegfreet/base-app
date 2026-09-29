import {
    Column,
    Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, type Relation
} from "typeorm";

import { AbstractEntity } from "./abstract-entity.js";
import { Permission } from "./permission.entity.js";
import { Tenant } from "./tenant.entity.js";
import { User } from "./user.entity.js";

@Entity({ name: "roles" })
@Index("uq_roles_tenant_id_slug", ["tenantId", "slug"], { unique: true })
export class Role extends AbstractEntity {

  @Column({ name: "name", type: "varchar" })
      name!: string;

  @Column({ name: "slug", type: "varchar" })
      slug!: string;

  @Column({ name: "description", type: "varchar", nullable: true })
      description!: string | null;

  @Column({ name: "is_active", type: "boolean", default: true })
      isActive!: boolean;

  @Column({ name: "tenant_id", type: "integer" })
      tenantId!: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.roles, { nullable: false })
  @JoinColumn({
      name: "tenant_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_roles_tenant_id",
  })
      tenant?: Relation<Tenant>;

  @ManyToMany(() => User, (user) => user.roles)
      users?: Relation<User[]>;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
      name: "role_permissions",
      joinColumn: {
          name: "role_id",
          referencedColumnName: "id",
          foreignKeyConstraintName: "fk_role_permissions_role_id",
      },
      inverseJoinColumn: {
          name: "permission_id",
          referencedColumnName: "id",
          foreignKeyConstraintName: "fk_role_permissions_permission_id",
      },
  })
      permissions?: Relation<Permission[]>;
}
