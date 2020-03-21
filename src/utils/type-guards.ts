/*
  This file contains our type guards.

  Type guards are a feature of TypeScript which narrow the type signature of
  intesection types (types that can be one thing or another).

  @see
  https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
 */

import { Claim } from '../types';

/** Assert `value` is `undefined`. */
function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

/** Assert `value` is `null`. */
function isNull(value: any): value is null {
  return value === null;
}

/** Assert `value` is `null` or `undefined`. */
function isNil(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

export function isDIDTClaim(value: any): value is Claim {
  return (
    !isNil(value) &&
    !isNil(value.iat) &&
    !isNil(value.ext) &&
    !isNil(value.iss) &&
    !isNil(value.sub) &&
    !isNil(value.aud) &&
    !isNil(value.nbf) &&
    !isNil(value.tid) &&
    !isNil(value.add)
  );
}
