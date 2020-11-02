import { assertEquals } from "https://deno.land/std@0.68.0/testing/asserts.ts";
import {
  asRanges,
  emptySet,
  filter,
  intersection,
  isEmpty,
  isEqual,
  isSubsetOf,
  minus,
  rangeSet,
  setOf,
  union,
} from "./mod.ts";

Deno.test("setOf", () => {
  assertEquals(setOf(1).size, 1);
  assertEquals(setOf(1).has(1), true);
  assertEquals(setOf(1).has(0), false);

  assertEquals(setOf([1, 2]).size, 2);
  assertEquals(setOf([1, 2]).has(1), true);
  assertEquals(setOf([1, 2]).has(0), false);

  assertEquals(isEmpty(setOf([1, 2, 3])), false);
});

Deno.test("isEmpty", () => {
  assertEquals(isEmpty(emptySet), true);
  assertEquals(isEmpty(setOf(1)), false);
  assertEquals(isEmpty(setOf([1, 2, 3])), false);
});

Deno.test("rangeSet", () => {
  assertEquals([...rangeSet(1, 0)], []);
  assertEquals([...rangeSet(0, 0)], [0]);
  assertEquals([...rangeSet(1, 5)], [1, 2, 3, 4, 5]);
});

Deno.test("intersection", () => {
  assertEquals(intersection(rangeSet(1, 5), rangeSet(6, 8)), emptySet);
  assertEquals(intersection(rangeSet(1, 5), rangeSet(5, 8)), setOf(5));
  assertEquals(intersection(rangeSet(1, 5), rangeSet(3, 8)), rangeSet(3, 5));
});

Deno.test("minus", () => {
  assertEquals(minus(rangeSet(1, 5), rangeSet(6, 8)), rangeSet(1, 5));
  assertEquals(minus(rangeSet(1, 5), rangeSet(5, 8)), rangeSet(1, 4));
  assertEquals(minus(rangeSet(1, 5), rangeSet(3, 8)), rangeSet(1, 2));
});

Deno.test("isSubsetOf", () => {
  assertEquals(isSubsetOf(emptySet, rangeSet(6, 8)), true);

  assertEquals(isSubsetOf(rangeSet(1, 5), rangeSet(3, 8)), false);
  assertEquals(isSubsetOf(rangeSet(1, 5), rangeSet(7, 8)), false);
  assertEquals(isSubsetOf(rangeSet(1, 5), rangeSet(1, 8)), true);
});

Deno.test("isEqual", () => {
  assertEquals(isEqual(emptySet, emptySet), true);
  assertEquals(isEqual(rangeSet(1, 5), rangeSet(1, 5)), true);

  assertEquals(isEqual(rangeSet(1, 5), rangeSet(1, 6)), false);
  assertEquals(isEqual(rangeSet(1, 6), rangeSet(1, 5)), false);
  assertEquals(isEqual(emptySet, rangeSet(1, 5)), false);
  assertEquals(isEqual(rangeSet(1, 5), emptySet), false);
});

Deno.test("union", () => {
  assertEquals(union(emptySet, rangeSet(6, 8)), rangeSet(6, 8));
  assertEquals(union(rangeSet(1, 5), rangeSet(3, 8)), rangeSet(1, 8));
  assertEquals(
    union(rangeSet(1, 5), rangeSet(7, 8)),
    setOf([1, 2, 3, 4, 5, 7, 8]),
  );
  assertEquals(union(rangeSet(1, 5), rangeSet(1, 8)), rangeSet(1, 8));
});

Deno.test("asRanges", () => {
  assertEquals(asRanges(emptySet as Set<number>), []);
  assertEquals(asRanges(setOf([1])), [1]);
  assertEquals(asRanges(setOf([1, 2])), [1, 2]);
  assertEquals(asRanges(setOf([1, 2, 3])), [[1, 3]]);
  assertEquals(asRanges(setOf([1, 2, 3, 4, 5, 6, 7])), [[1, 7]]);
  assertEquals(
    asRanges(setOf([1, 2, 3, 5, 6, 7, 9, 10])),
    [[1, 3], [5, 7], 9, 10],
  );
});

Deno.test("filter", () => {
  assertEquals(filter((e) => true, emptySet), emptySet);
  assertEquals(filter((e) => true, rangeSet(1, 5)), rangeSet(1, 5));
  assertEquals(filter((e) => e < 5, rangeSet(1, 5)), rangeSet(1, 4));
  assertEquals(filter((e) => e < 5, rangeSet(10, 20)), emptySet);
});
