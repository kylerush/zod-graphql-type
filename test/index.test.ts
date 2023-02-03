import { describe, expect, test } from "vitest";
import { ZodError, z } from "zod";
import {
  validateZodIssueCode,
  zodParsedType,
  zodParsedTypes,
  stringNumber,
  zodErrorsTozodIssues,
} from "../index";

describe.concurrent("index.ts suite", () => {
  test("validateZodIssueCode", () => {
    expect(validateZodIssueCode("invalid_type")).toEqual("invalid_type");
    expect(() => {
      validateZodIssueCode("not_valid");
    }).toThrow();
    expect(() => {
      validateZodIssueCode(1);
    }).toThrowError("Provided value must be a string.");
  });

  test("zodParsedType", () => {
    // Happy path
    expect(zodParsedType("string")).toEqual("string");

    // Error cases
    expect(() => {
      zodParsedType(1);
    }).toThrowError("Provided value must be a string.");

    expect(() => {
      zodParsedType("hello");
    }).toThrowError(
      `Provided value is not one of ${Array.from(zodParsedTypes).join(", ")}`
    );
  });

  test("StringNumber", () => {
    // Happy path
    expect(stringNumber(1)).toEqual(1);
    // Error case
    expect(() => {
      stringNumber(null);
    }).toThrowError("Provided value is not a string or a number.");
  });

  test("zodErrorsTozodIssues", () => {
    expect.assertions(2);
    const schema = z.string();
    try {
      schema.parse(1);
    } catch (err) {
      const error = err as ZodError;
      expect(zodErrorsTozodIssues(error)).toEqual([
        {
          code: "invalid_type",
          expected: "string",
          message: "Expected string, received number",
          path: [],
          received: "number",
        },
      ]);
    }

    const unionSchema = z.union([z.string(), z.number()]);
    try {
      unionSchema.parse(null);
    } catch (err) {
      const error = err as ZodError;
      expect(zodErrorsTozodIssues(error)).toEqual([
        {
          code: "invalid_union",
          message: "Invalid input",
          path: [],
          unionIssues: [
            [
              {
                code: "invalid_type",
                expected: "string",
                message: "Expected string, received null",
                path: [],
                received: "null",
              },
            ],
            [
              {
                code: "invalid_type",
                expected: "number",
                message: "Expected number, received null",
                path: [],
                received: "null",
              },
            ],
          ],
        },
      ]);
    }
  });
});
