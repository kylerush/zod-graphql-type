import { ZodError, z } from "zod";
import type { IResolverObject } from "mercurius";
import type { QuerycheckSchemaArgs } from "../types/graphql/generated";
import { zodErrorsTozodIssues } from "../index.js";

export const checkSchemaTypeDef = `
  input ObjectToValidate {
    string: AnyType
    stringMax: String
    stringCustomError: AnyType
    number: AnyType
    union: AnyType
    secondUnion: AnyType
    enum: AnyType
    unrecognized: AnyType
    tooSmall: AnyType
    stringValidator: AnyType
    date: AnyType
    multipleOf: Int
  }
  type Success {
    message: String!
  }
  type Error {
    message: String!
    zodIssues: [ZodIssue]
  }
  union ValidationResult = Success | Error
  extend type Query {
    """
    Simple query for test.
    """
    checkSchema(input: ObjectToValidate): ValidationResult!
  }
`;

export const checkSchemaResolver: IResolverObject = {
  checkSchema: (_parent, _args) => {
    const args = _args as QuerycheckSchemaArgs;
    const schema = z
      .object({
        string: z.optional(z.string()),
        stringMax: z.optional(z.string().max(2)),
        stringCustomError: z.optional(
          z.string({
            required_error: "Required test",
            invalid_type_error: "Invalid type test",
          })
        ),
        number: z.optional(z.number()),
        union: z.optional(z.union([z.string(), z.number()])),
        secondUnion: z.optional(z.union([z.string(), z.number()])),
        enum: z.optional(z.enum(["one", "two"])),
        tooSmall: z.optional(z.string().min(2)),
        stringValidator: z.optional(z.string().email()),
        date: z.optional(z.date()),
        multipleOf: z.optional(z.number().multipleOf(5)),
      })
      .strict();
    try {
      schema.parse(args.input);
      return {
        __typename: "Success",
        message: "Object passed validation.",
      };
    } catch (err) {
      const error = err as ZodError;
      const returnObj = {
        __typename: "Error",
        message: "Object failed validation.",
        zodIssues: zodErrorsTozodIssues(error),
      };
      return returnObj;
    }
  },
};
