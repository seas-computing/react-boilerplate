/**
 * @module Server.Entities
 */

import {
  Entity,
  Column,
  ManyToOne,
  ObjectType,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import {
  BaseEntity,
  Course,
  Faculty,
  Semester,
} from '.';

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

  @ManyToMany(
    (): ObjectType<Faculty> => Faculty,
    ({ courseInstances }): CourseInstance[] => courseInstances
  )
  public faculty: Faculty[];

  @OneToMany(
    (): ObjectType<Semester> => Semester,
    ({ courseInstances }): CourseInstance[] => courseInstances
  )
  public semester: Semester;
}
