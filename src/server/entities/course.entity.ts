/**
 * @module Server.Entities
 */

import {
  Entity,
  Column,
  ManyToOne,
  ObjectType,
} from 'typeorm';
import { Area, BaseEntity } from '.';

/**
 * The parent of many CourseInstance entities. The course entity is responsibile
 * for managing area, title and course code information. This informaion does
 * not change between course insances. It's modification would denote the
 * creation of an entirely new course
 */

@Entity()
export class Course extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The long title for the course (i.e - Introduction to computer'
      + ' science)',
  })
  public title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The alphabetical part of the course code (i.e - The CS in CS 50)',
  })
  public prefix: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The alphabetical part of the course code (i.e - the CS in CS 50).'
      + ' "number" may also include an alphabetical component (i.e - CS 109b)',
  })
  public number: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public undergraduate: boolean = false;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Free text for administrators to record notes against a course',
  })
  public readonly notes?: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    comment: 'Sometimes, admin staff wish to hide courses and prevent their'
      + ' publication, either because the courses are non-SEAS courses and'
      + ' should not be displayed on the SEAS course schedule, or because they'
      + ' are still finalizing the course details',
  })
  public private: boolean = true;

  @ManyToOne(
    (): ObjectType<Area> => Area,
    ({ courses }): Course[] => courses
  )
  public area: Area;
}
