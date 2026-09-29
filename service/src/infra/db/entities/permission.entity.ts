import {
    Column,
    Entity, Index, ManyToMany, type Relation
} from "typeorm";

import { AbstractEntity } from "./abstract-entity.js";
import { Role } from "./role.entity.js";

@Entity({ name: "permissions" })
@Index("uq_permissions_slug", ["slug"], { unique: true })
export class Permission extends AbstractEntity {

  @Column({ name: "name", type: "varchar" })
      name!: string;

  @Column({ name: "slug", type: "varchar" })
      slug!: string;

  @Column({ name: "description", type: "varchar", nullable: true })
      description!: string | null;

  @ManyToMany(() => Role, (role) => role.permissions)
      roles?: Relation<Role[]>;
}
