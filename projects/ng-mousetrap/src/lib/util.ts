export const values = <T>(dict: Record<string, T>): T[] =>
  Object.keys(dict).map(k => dict[k])

export const flatten = <T>(nested: T[][]): T[] => [].concat.apply([], nested)
