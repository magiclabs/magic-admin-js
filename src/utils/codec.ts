/*
 * Check if global object window is defined
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/*
 * Decode base64 value, returns string
 * @Params: string
 */
export function decodeValue(value: string): string {
  if (!value) {
    return '';
  }

  const valueToString = value.toString();

  if (isBrowser()) {
    return atob(valueToString);
  }

  const buff = Buffer.from(valueToString, 'base64');
  return buff.toString('ascii');
}
