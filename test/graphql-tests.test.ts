import { describe, expect, test } from "vitest";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import { fastify as Fastify } from "./fastify.js";
import {
  ZodIssueCode,
  ZodType,
  checkSchemaDocument,
} from "../types/graphql/generated.js";
import { ZodParsedType } from "zod";

describe.concurrent("Test suite", async () => {
  const fastify = await Fastify();
  const testClient = createMercuriusTestClient(fastify);
  const zodErrorBase = {
    code: ZodIssueCode.invalid_type,
    expected: ZodParsedType.string,
    inclusive: null,
    keys: null,
    unionIssues: null,
    maximum: null,
    message: "Expected string, received number",
    minimum: null,
    multipleOf: null,
    options: null,
    path: ["string"],
    received: ZodParsedType.number,
    type: null,
    validation: null,
  };

  test("z.string()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { string: 1 },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
            },
          ],
        },
      },
    });
  });
  test("z.string().max()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { stringMax: "two" },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.too_big,
              expected: null,
              inclusive: true,
              maximum: 2,
              message: "String must contain at most 2 character(s)",
              path: ["stringMax"],
              received: null,
              type: ZodType.string,
            },
          ],
        },
      },
    });
  });
  test("z.string() custom error", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { stringCustomError: 1 },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              message: "Invalid type test",
              path: ["stringCustomError"],
            },
          ],
        },
      },
    });
  });
  test("z.union()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { union: null },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.invalid_union,
              path: ["union"],
              message: "Invalid input",
              expected: null,
              received: null,
              unionIssues: [
                [
                  {
                    code: ZodIssueCode.invalid_type,
                    expected: "string",
                    received: "null",
                    path: ["union"],
                    message: "Expected string, received null",
                  },
                ],
                [
                  {
                    code: ZodIssueCode.invalid_type,
                    expected: "number",
                    received: "null",
                    path: ["union"],
                    message: "Expected number, received null",
                  },
                ],
              ],
            },
          ],
        },
      },
    });
  });
  test("z.enum()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { enum: "three" },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.invalid_enum_value,
              path: ["enum"],
              message:
                "Invalid enum value. Expected 'one' | 'two', received 'three'",
              received: "three",
              expected: null,
              options: ["one", "two"],
            },
          ],
        },
      },
    });
  });
  test("ZodIssueCode.unrecognized_keys", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { unrecognized: "1" },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.unrecognized_keys,
              path: [],
              message: "Unrecognized key(s) in object: 'unrecognized'",
              keys: ["unrecognized"],
              expected: null,
              received: null,
            },
          ],
        },
      },
    });
  });
  test("ZodIssueCode.too_small", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { tooSmall: "1" },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.too_small,
              path: ["tooSmall"],
              message: "String must contain at least 2 character(s)",
              type: "string",
              minimum: 2,
              inclusive: true,
              expected: null,
              received: null,
            },
          ],
        },
      },
    });
  });
  test("stringValidator - z.string().email()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { stringValidator: "no" },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.invalid_string,
              path: ["stringValidator"],
              message: "Invalid email",
              validation: "email",
              expected: null,
              received: null,
            },
          ],
        },
      },
    });
  });
  test("z.date()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { date: "no date" },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.invalid_type,
              path: ["date"],
              message: "Expected date, received string",
              expected: "date",
              received: "string",
            },
          ],
        },
      },
    });
  });
  test("numberValidator z.number().multipleOf()", async () => {
    const graphQlQuery = await testClient.query(checkSchemaDocument, {
      variables: { multipleOf: 2 },
    });
    expect(graphQlQuery).toEqual({
      data: {
        checkSchema: {
          __typename: "Error",
          message: "Object failed validation.",
          zodIssues: [
            {
              ...zodErrorBase,
              code: ZodIssueCode.not_multiple_of,
              path: ["multipleOf"],
              message: "Number must be a multiple of 5",
              expected: null,
              received: null,
              multipleOf: 5,
            },
          ],
        },
      },
    });
  });
});
