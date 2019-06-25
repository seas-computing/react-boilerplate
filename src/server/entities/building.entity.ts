/**
 * @module Server.Entities
 */

import {
  Entity, Column, OneToMany, ObjectType, ManyToOne,
} from 'typeorm';
import {
  BaseEntity,
  Room,
  Campus,
} from '.';

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

  @ManyToOne(
    (): ObjectType<Campus> => Campus,
    ({ buildings }): Building[] => buildings
  )
  public campus: Campus;
}
