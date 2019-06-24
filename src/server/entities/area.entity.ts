/**
 * @module Server.Entities
 */

import {
  Entity, Column, OneToMany, ObjectType,
} from 'typeorm';
import { BaseEntity, Course } from '.';

@Entity()
export class Area extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The subject area name (i.e - Applied Mathematics)',
  })
  public name: string;

  @OneToMany(
    (): ObjectType<Course> => Course,
    ({ area }): Area => area
  )
  public courses: Course[];
}
