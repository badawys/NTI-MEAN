/**
 * BaseEntity demonstrates a small inheritance relationship.
 *
 * `public` members are available everywhere. `protected` members are available
 * inside this class and subclasses, but not to unrelated callers.
 */
export abstract class BaseEntity {
  constructor(
    public readonly id: string,
    protected readonly createdAt: Date,
  ) {}

  /**
   * Public methods expose controlled behavior without exposing protected state.
   */
  public getCreatedDate(): string {
    return this.createdAt.toISOString().slice(0, 10);
  }
}

/**
 * CourseCapacityRecord extends BaseEntity because it genuinely is an entity
 * with an identity and creation date.
 */
export class CourseCapacityRecord extends BaseEntity {
  /**
   * `private` keeps approved enrollment state inside this class.
   */
  private approvedEnrollments: number;

  constructor(
    id: string,
    createdAt: Date,
    public readonly capacity: number,
    approvedEnrollments: number,
  ) {
    super(id, createdAt);
    this.approvedEnrollments = approvedEnrollments;
  }

  /**
   * The getter calculates a safe public view of the private field.
   */
  public get remainingSeats(): number {
    return Math.max(0, this.capacity - this.approvedEnrollments);
  }

  /**
   * The method validates a state change instead of allowing direct mutation.
   */
  public approveOneEnrollment(): boolean {
    if (this.remainingSeats === 0) {
      return false;
    }

    this.approvedEnrollments += 1;
    return true;
  }
}
