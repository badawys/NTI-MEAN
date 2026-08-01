/**
 * ApiResult<T> is a discriminated union for expected success and failure.
 *
 * The `success` field is the discriminator. After checking
 * `if (result.success)`, TypeScript knows that `data` exists; in the `else`
 * branch it knows that `error` exists.
 */
export type ApiResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
