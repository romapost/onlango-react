export function clearUndefinedProps(obj) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (typeof obj[key] == 'undefined') delete obj[key];
  }
  return obj;
}
