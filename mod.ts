export const emptySet = new Set();

export function setOf<T>(v: T | Array<T>): Set<T> {
  const result = new Set<T>();

  if (v instanceof Array) {
    v.forEach((element) => {
      result.add(element);
    });
  } else {
    result.add(v);
  }
  return result;
}

export function rangeSet(from: number, to: number): Set<number> {
  if (from < to) {
    const result = new Set<number>();

    while (from <= to) {
      result.add(from);
      from += 1;
    }

    return result;
  } else if (from == to) {
    return setOf(from);
  } else {
    return emptySet as Set<number>;
  }
}

export function isEmpty<T>(set: Set<T>): boolean {
  return set.size == 0;
}

export function isSingleton<T>(set: Set<T>): boolean {
  return set.size == 1;
}

export function first<T>(set: Set<T>): T {
  return [...set][0];
}

export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();

  a.forEach((element) => {
    if (b.has(element)) {
      result.add(element);
    }
  });

  return result;
}

export function minus<T>(source: Set<T>, extract: Set<T>): Set<T> {
  if (isEmpty(intersection(source, extract))) {
    return source;
  } else {
    const result = new Set<T>(source);

    extract.forEach((element) => {
      if (result.has(element)) {
        result.delete(element);
      }
    });

    return result;
  }
}

export function isSubsetOf<T>(a: Set<T>, b: Set<T>): boolean {
  for (const element of a) {
    if (!b.has(element)) {
      return false;
    }
  }

  return true;
}

export function isEqual<T>(a: Set<T>, b: Set<T>): boolean {
  return a.size == b.size && isSubsetOf(a, b) && isSubsetOf(b, a);
}

export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
  if (isSubsetOf(a, b)) {
    return b;
  } else if (isSubsetOf(b, a)) {
    return a;
  } else {
    const result = new Set<T>(a);

    b.forEach((element) => {
      result.add(element);
    });

    return result;
  }
}

export function asArray<T>(s: Set<T>): Array<T> {
  return [...s];
}

export type SetRange = number | [number, number];

export function asRanges(s: Set<number>): Array<SetRange> {
  const result: Array<SetRange> = [];

  const setAsSortedList = asArray(s).sort((a, b) => a - b);

  let left = 0;

  while (left < setAsSortedList.length) {
    let right = left;

    while (
      right + 1 < setAsSortedList.length &&
      setAsSortedList[right] + 1 == setAsSortedList[right + 1]
    ) {
      right += 1;
    }

    if (right == left) {
      result.push(setAsSortedList[left]);
    } else if (right == left + 1) {
      result.push(setAsSortedList[left]);
      result.push(setAsSortedList[right]);
    } else {
      result.push([setAsSortedList[left], setAsSortedList[right]]);
    }

    left = right + 1;
  }

  return result;
}
