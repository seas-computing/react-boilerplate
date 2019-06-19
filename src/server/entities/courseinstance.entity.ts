/**
 * @module Server.Entities
 */

import {
  Entity,
  Column,
  ManyToOne,
  ObjectType,
} from 'typeorm';
import { BaseEntity, Course } from '.';

@Entity()
export class CourseInstance extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  public readonly name: string;

  @ManyToOne(
    (): ObjectType<Course> => Course,
    ({ instances }): CourseInstance[] => instances
  )
  public course: Course;
}
