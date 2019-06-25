/**
 * @module Server.Entities
 */

import {
  Entity, Column, ManyToOne, ObjectType,
} from 'typeorm';
import { BaseEntity, Building, Meeting } from '.';

@Entity()
export class Room extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The room name (i.e - Lecture Theatre)',
  })
  public name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The floor the room is located on (i.e - "Ground")',
  })
  public floor: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Indicator for the number of people the room is capable of'
      + ' holding.',
  })
  public capacity: number;

  @ManyToOne(
    (): ObjectType<Meeting> => Meeting,
    ({ room }): Room => room
  )
  public meetings: Meeting[];

  @ManyToOne(
    (): ObjectType<Building> => Building,
    ({ rooms }): Room[] => rooms
  )
  public building: Building;
}
