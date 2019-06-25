/**
 * @module Server.Entities
 */

import {
  Entity, Column, OneToMany, ObjectType,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Room } from './room.entity';

@Entity()
export class Building extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The building name (i.e - Maxwell Dworkin)',
  })
  public name: string;

  @OneToMany(
    (): ObjectType<Room> => Room,
    ({ building }): Building => building
  )
  public rooms: Room[];
}
