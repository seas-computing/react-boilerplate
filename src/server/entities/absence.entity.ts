/**
 * @module Server.Entities
 */

import {
  Entity, OneToMany, ObjectType, Column, ManyToOne,
} from 'typeorm';
import {
  BaseEntity,
  Semester,
  Faculty,
} from '.';

/**
 * Describes the different types of leave available to [[Faculty]] members at
 * Harvard.
 *
 * For more information regarding the types of leave available - see
 * {@link https://facultyresources.fas.harvard.edu/leaves the FAS website}
 */
export enum ABSENCE_TYPE {
  /**
   * A period of paid research leave granted for study or travel.
   * This is typically only available to ladder faculty
   */
  SABBATICAL = 'sabbatical',

  /**
   * Faculty member is not currently on sabbatical, but is eligible to take
   * a sabbatical. Usually sabbatical is available only to tenured professors.
   * Non-ladder faculty members, with the exception of Professors in Residence
   * and Professors of the Practice, are not eligible for either paid or unpaid
   * research leaves.
   */
  SABBATICAL_ELIGIBLE = 'sabbatical_eligible',

  /**
   * Faculty member is not eligble for sabbatical. Typically this would  be
   * non-faculty staff, or non-ladder faculty.
   */
  SABBATICAL_INELIGIBLE = 'sabbatical_ineligible',

  /**
   * Relief of some teaching responsibilites in order to perform administrative
   * work related to the faculty member's role
   */
  TEACHING_RELIEF = 'teaching_relief',

  /**
   * Similar to [[SABBATICAL]], but typically unpaid. Like sabbaticals -
   * only ladder faculty are eligible for research leave
   */
  RESEARCH_LEAVE = 'research_leave',

  /**
   * All staff are eligible for parental leave
   *
   * See: {@link https://hr.harvard.edu/leaves-absence}
   */
  PARENTAL_LEAVE = 'parental_leave',

  /**
   * Indicates that staff member is no longer active. They may have retired,
   * moved, or are no longer at Harvard
   */
  NO_LONGER_ACTIVE = 'no_longer_active',

  /**
   * Staff member is not currently absent
   */
  NONE = 'none'
}

@Entity()
export class Absence extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Object.values(ABSENCE_TYPE),
    comment: 'The type of absence (i.e: Parental Leave, Research Leave etc.)',
    default: ABSENCE_TYPE.SABBATICAL_INELIGIBLE,
  })
  public type: ABSENCE_TYPE;

  @OneToMany(
    (): ObjectType<Semester> => Semester,
    ({ absences }): Absence[] => absences
  )
  public semester: Semester;

  @ManyToOne(
    (): ObjectType<Faculty> => Faculty,
    ({ absence }): Absence => absence
  )
  public faculty: Faculty[];
}
