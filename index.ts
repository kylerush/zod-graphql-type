import { GraphQLScalarType } from "graphql";
import type { ZodError, ZodIssue } from "zod";

export const zodTypeDef = `
  scalar StringNumber
  scalar ZodParsedType
  enum ZodValidation {
    url
    email
    uuid
  }
  enum ZodType {
    string
    number
    array
  }
  enum ZodIssueCode {
    invalid_type
    unrecognized_keys
    invalid_union
    invalid_enum_value
    invalid_arguments
    invalid_return_type
    invalid_date
    invalid_string
    too_small
    too_big
    not_multiple_of
    custom
  }
  type ZodUnionIssue {
    code: ZodIssueCode!
    expected: ZodParsedType
    received: ZodParsedType
    path: [StringNumber]
    message: String!
  }
  type ZodIssue {
    code: ZodIssueCode!
    path: [StringNumber]
    message: String!
    expected: ZodParsedType
    received: String
    keys: [String]
    unionIssues: [[ZodUnionIssue]]
    options: [String]
    argumentsError: ZodIssue
    returnTypeError: ZodIssue
    validation: ZodValidation
    type: ZodType
    minimum: Int
    maximum: Int
    inclusive: Boolean
    multipleOf: Int
  }
`;

export const zodParsedTypes: Set<string> = new Set([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set",
]);

const ZodParsedType = new GraphQLScalarType({
  name: "ZodParsedType",
  description:
    "This is an enum used by Zod internally to represent the type of a parsed value.",
  serialize: zodParsedType,
  parseValue: zodParsedType,
  parseLiteral: zodParsedType,
});

const StringNumber = new GraphQLScalarType({
  name: "StringNumber",
  description: "string | number",
  serialize: stringNumber,
  parseValue: stringNumber,
  parseLiteral: stringNumber,
});

export function zodParsedType(value: unknown) {
  if (typeof value !== "string") {
    throw new Error("Provided value must be a string.");
  }
  if (!zodParsedTypes.has(value)) {
    throw new Error(
      `Provided value is not one of ${Array.from(zodParsedTypes).join(", ")}`
    );
  }
  return value;
}

export function stringNumber(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  } else {
    throw new Error("Provided value is not a string or a number.");
  }
}

type ZodIssueWithUnionErrors = ZodIssue & { unionErrors: ZodError[] };
type ZodIssuesWithUnionIssues = ZodIssue & {
  unionIssues?: ZodIssue[][];
  unionErrors?: ZodError[];
};
export function zodErrorsTozodIssues(zodError: ZodError) {
  const zodIssues = zodError.errors as ZodIssueWithUnionErrors[];
  return zodIssues.map((issue) => {
    // If the issue has unionErrors format them so we don't return Error class instances to GraphQL
    if (Object.prototype.hasOwnProperty.call(issue, "unionErrors")) {
      const formattedObject: ZodIssuesWithUnionIssues = { ...issue };
      formattedObject.unionIssues = issue.unionErrors.map((unionError) => {
        return unionError.errors;
      });
      delete formattedObject.unionErrors;
      return formattedObject;
    } else {
      return issue;
    }
  });
}

export const scalars = { StringNumber, ZodParsedType };
