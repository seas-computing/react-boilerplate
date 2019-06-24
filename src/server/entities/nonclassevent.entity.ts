/**
 * @module Server.Entities
 */

import {
  Entity,
  Column,
  ManyToOne,
  ObjectType,
} from 'typeorm';
import { BaseEntity, NonClassParent, Semester } from '.';

@Entity()
export class NonClassEvent extends BaseEntity {
  @Column({
    type: 'varchar',
    comment: 'The title of the non-class event. This type of event is typically'
      + ' used to schedule non-class meetings such as reading groups etc.',
  })
  public title: string;

  @ManyToOne(
    (): ObjectType<NonClassParent> => NonClassParent,
    ({ nonClassEvents }): NonClassEvent[] => nonClassEvents
  )
  public nonClassParent: NonClassParent;

  @ManyToOne(
    (): ObjectType<Semester> => Semester,
    ({ nonClassEvents }): NonClassEvent[] => nonClassEvents
  )
  public semester: Semester;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public published: boolean = false;
}
