/**
 * @module Server.Entities
 */

import {
  Entity,
  Column,
  ObjectType,
  OneToMany,
} from 'typeorm';
import { BaseEntity, CourseInstance, NonClassEvent } from '.';

@Entity()
export abstract class Semester extends BaseEntity {
  @Column({
    type: 'int',
  })
  public acyr: number;

  @Column({
    type: 'varchar',
  })
  public term: string;

  @OneToMany(
    (): ObjectType<CourseInstance> => CourseInstance,
    ({ semester }): Semester => semester
  )
  public courseInstances: CourseInstance[];

  @OneToMany(
    (): ObjectType<NonClassEvent> => NonClassEvent,
    ({ semester }): Semester => semester
  )
  public nonClassEvents: NonClassEvent[];
}
