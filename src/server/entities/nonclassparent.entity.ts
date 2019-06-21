/**
 * @module Server.Entities
 */

import {
  Entity, Column, ObjectType, ManyToOne,
} from 'typeorm';
import { BaseEntity, Course } from '.';

/**
 * Parent entity to non-class events. Designed to be analogous to {@link Course}
 * except that non class events occur independently of courses and course
 * instances and therefore need to be able to be scheduled independently of
 * course events
 */
@Entity()
export class NonClassParent extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  public title: string;

  @Column({
    type: 'varchar',
    comment: 'The faculty member contact for a given event. This is recorded'
      + ' here, as this information does not regularly change',
  })
  public contact: string;

  @ManyToOne(
    (): ObjectType<Course> => Course,
    ({ nonClassParents }): NonClassParent[] => nonClassParents
  )
  public course: Course;
}
