/**
 * ApiSuccess keeps a successful value and its HTTP-style status code together.
 */
export interface ApiSuccess<T> {
  ok: true;
  status: number;
  data: T;
}

/**
 * ApiFailure contains an error message instead of successful data.
 */
export interface ApiFailure {
  ok: false;
  status: number;
  error: string;
}

/**
 * ApiResult<T> is a generic discriminated union.
 *
 * The caller chooses T, so the same result structure can safely carry a
 * Course, Enrollment, User, or a list of any of those types.
 */
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/**
 * Creates the successful side of ApiResult<T>.
 */
export function success<T>(data: T, status = 200): ApiSuccess<T> {
  return { ok: true, status, data };
}

/**
 * Creates the failure side. It does not need a generic type because a failed
 * result does not contain data.
 */
export function failure(error: string, status = 400): ApiFailure {
  return { ok: false, status, error };
}

/**
 * Type narrowing on the `ok` field safely chooses between data and error.
 */
export function describeResult<T>(
  result: ApiResult<T>,
  formatData: (data: T) => string,
): string {
  return result.ok ? formatData(result.data) : result.error;
}
