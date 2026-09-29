import {
    Column, DeleteDateColumn,
    Entity, Index, ManyToMany, OneToMany, type Relation
} from "typeorm";

import { AbstractEntity } from "./abstract-entity.js";
import { Role } from "./role.entity.js";
import { User } from "./user.entity.js";

@Entity({ name: "tenants" })
@Index("uq_tenants_slug_not_deleted", ["slug"], {
    unique: true,
    where: "\"deleted_at\" IS NULL",
})
export class Tenant extends AbstractEntity {

  @Column({ name: "name", type: "varchar" })
      name!: string;

  @Column({ name: "slug", type: "varchar" })
      slug!: string;

  @Column({ name: "document", type: "varchar", nullable: true })
      document!: string | null;

  @Column({ name: "email", type: "varchar", nullable: true })
      email!: string | null;

  @Column({ name: "is_active", type: "boolean", default: true })
      isActive!: boolean;

  @ManyToMany(() => User, (user) => user.tenants)
      users?: Relation<User[]>;

  @OneToMany(() => Role, (role) => role.tenant)
      roles?: Relation<Role[]>;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true, select: false })
      deletedAt?: Date | null;
}
