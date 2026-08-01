/**
 * Primitive annotations describe the basic values used by the application.
 * TypeScript can infer many of these types, but explicit annotations are useful
 * while learning and at important function or API boundaries.
 */
export const trainingCenterName: string = 'Codes Training Center';
export const courseCapacity: number = 30;
export const registrationOpen: boolean = true;

/**
 * Arrays keep every item under one element type.
 */
export const courseTopics: string[] = [
  'components',
  'routing',
  'forms',
];

/**
 * A tuple describes a fixed number of positions with different meanings.
 */
export const lessonSchedule: readonly [
  startDate: string,
  durationHours: number,
] = ['2026-08-10', 18];

/**
 * This object type documents the required shape of a small draft object.
 */
export const courseDraft: {
  title: string;
  capacity: number;
  published: boolean;
} = {
  title: 'Angular Foundations',
  capacity: 30,
  published: true,
};

/**
 * Type inference understands that inferredLevel is a string without a manual
 * annotation. Hover over the variable in an editor to inspect the result.
 */
export const inferredLevel = 'beginner';

/**
 * `any` disables useful checks. This function exists only to demonstrate why
 * using any to silence compiler errors can move a mistake into runtime.
 */
export function demonstrateAnyRisk(value: any): string {
  return value.toUpperCase();
}

/**
 * `unknown` accepts external data but requires narrowing before use.
 */
export function describeUnknownValue(value: unknown): string {
  if (typeof value === 'string') {
    return `Text: ${value}`;
  }

  if (typeof value === 'number') {
    return `Number: ${value}`;
  }

  return 'Unsupported value';
}

/**
 * An enum creates a JavaScript object at runtime. It is sometimes useful when
 * runtime access is required, although this project prefers literal unions for
 * its small API contracts.
 */
export enum CourseStatusEnum {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

/**
 * Parameters and return values make the function contract clear to callers.
 */
export function buildCourseLabel(
  title: string,
  level: string,
): string {
  return `${title} · ${level}`;
}
