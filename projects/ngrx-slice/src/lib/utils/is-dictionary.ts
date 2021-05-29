export function isDictionary(arg: unknown): arg is Record<string, unknown> {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    !Array.isArray(arg) &&
    !(arg instanceof Date)
  );
}
