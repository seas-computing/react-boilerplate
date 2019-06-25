/**
 * @module Server.Entities
 */

import {
  Entity, Column, OneToMany, ObjectType,
} from 'typeorm';
import { BaseEntity, Building } from '.';

@Entity()
export class Campus extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'Campus name (i.e - Alston)',
  })
  public name: string;

  @OneToMany(
    (): ObjectType<Building> => Building,
    ({ campus }): Campus => campus
  )
  public buildings: Building[];
}
