import { fibonacci } from "./fibonacci.ts";

test("fibonacci-5", () => {
  expect(fibonacci(5)).toBe(5);
});

test("fibonnaci-negative", () => {
  expect(() => fibonacci(-5)).toThrow("Cannot compute on negative numbers");
});
