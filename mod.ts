export const emptySet = new Set();

/**
 * Construct a set from a value or collection of values.
 * 
 * @param v either a value or collection of values
 */
export const setOf = <T>(v: T | Array<T>): Set<T> => {
  const result = new Set<T>();

  if (v instanceof Array) {
    v.forEach((element) => {
      result.add(element);
    });
  } else {
    result.add(v);
  }
  return result;
};

/**
 * Constructs a set of numbers composed of the values in the range `from`..`to`.  Note if `from` is greater than `to` then an empty set is returned.
 */
export const rangeSet = (from: number, to: number): Set<number> => {
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
};

/**
 * Returns whether or `set` has any elements.
 */
export const isEmpty = <T>(set: Set<T>): boolean => set.size == 0;

/**
 * Returns whether or not `set` contains a single element
 */
export const isSingleton = <T>(set: Set<T>): boolean => set.size == 1;

/**
 * Returns an element from `set`.
 */
export const first = <T>(set: Set<T>): T => [...set][0];

/**
 * Returns a new set composed of the intersection of `a` and `b`.
 */
export const intersection = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  const result = new Set<T>();

  a.forEach((element) => {
    if (b.has(element)) {
      result.add(element);
    }
  });

  return result;
};

/**
 * Returns a new set composed of all elements in `source` that are no in `extract`.
 */
export const minus = <T>(source: Set<T>, extract: Set<T>): Set<T> => {
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
};

/**
 * Returns whether or not all elements in `a` are also in `b`.
 */
export const isSubsetOf = <T>(a: Set<T>, b: Set<T>): boolean => {
  for (const element of a) {
    if (!b.has(element)) {
      return false;
    }
  }

  return true;
};

/**
 * Returns whether or not `a` and `b` are the same.  In this library equality is defined as
 * 
 * ```js
 * isEqual(a, b) == isSubsetOf(a, b) && isSubsetOf(b, a)
 * ```
 */
export const isEqual = <T>(a: Set<T>, b: Set<T>): boolean =>
  a.size == b.size && isSubsetOf(a, b) && isSubsetOf(b, a);

/**
 * Returns a set composed of all the elements in `a` combined with all the elments in `b`.
 */
export const union = <T>(a: Set<T>, b: Set<T>): Set<T> => {
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
};

/**
 * Returns an array composed of all the elements in `s`.  No assumption should be made on the order of the elements on the result.
 */
export const asArray = <T>(s: Set<T>): Array<T> => [...s];

/**
 * This type is used to represent the contents of a set.  So the set {1, 2, 3, 6, 7, 10, 11, 12} can be represented as
 * 
 * ```
 * 1-3, 6, 7, 10-12
 * ```
 * 
 * This is then encoded as an array composed of `SetRange` elements
 * 
 * ```js
 * [[1, 3], 6, 7, [10, 12]]
 * ```
 */
export type SetRange = number | [number, number];

/**
 * Returns `s` as an array of [SetRange] elements.
 */
export const asRanges = (s: Set<number>): Array<SetRange> => {
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
};

/**
 * Returns a filtered set containing only those elements in `s` where the predicate `p` is satisfied.
 */
export const filter = <S>(p: (e: S) => boolean, s: Set<S>) =>
  setOf([...s].filter(p));
