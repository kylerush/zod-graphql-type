import { GraphQLScalarType } from "graphql";
import type { ZodError, ZodIssue } from "zod";
export declare const zodTypeDef = "\n  scalar StringNumber\n  scalar ZodParsedType\n  enum ZodValidation {\n    url\n    email\n    uuid\n  }\n  enum ZodType {\n    string\n    number\n    array\n  }\n  enum ZodIssueCode {\n    invalid_type\n    unrecognized_keys\n    invalid_union\n    invalid_enum_value\n    invalid_arguments\n    invalid_return_type\n    invalid_date\n    invalid_string\n    too_small\n    too_big\n    not_multiple_of\n    custom\n  }\n  type ZodUnionIssue {\n    code: ZodIssueCode!\n    expected: ZodParsedType\n    received: ZodParsedType\n    path: [StringNumber]\n    message: String!\n  }\n  type ZodIssue {\n    code: ZodIssueCode!\n    path: [StringNumber]\n    message: String!\n    expected: ZodParsedType\n    received: String\n    keys: [String]\n    unionIssues: [[ZodUnionIssue]]\n    options: [String]\n    argumentsError: ZodIssue\n    returnTypeError: ZodIssue\n    validation: ZodValidation\n    type: ZodType\n    minimum: Int\n    maximum: Int\n    inclusive: Boolean\n    multipleOf: Int\n  }\n";
export declare const zodParsedTypes: Set<string>;
export declare function zodParsedType(value: unknown): string;
export declare function stringNumber(value: unknown): string | number;
export declare function zodErrorsTozodIssues(zodError: ZodError): ((import("zod").ZodInvalidTypeIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidLiteralIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodUnrecognizedKeysIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidUnionIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidUnionDiscriminatorIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidEnumValueIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidArgumentsIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidReturnTypeIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidDateIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidStringIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodTooSmallIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodTooBigIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidIntersectionTypesIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodNotMultipleOfIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodNotFiniteIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodCustomIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionErrors: ZodError<any>[];
}) | (import("zod").ZodInvalidTypeIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidLiteralIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodUnrecognizedKeysIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidUnionDiscriminatorIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidEnumValueIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidArgumentsIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidReturnTypeIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidDateIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidStringIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodTooSmallIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodTooBigIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodInvalidIntersectionTypesIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodNotMultipleOfIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodNotFiniteIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}) | (import("zod").ZodCustomIssue & {
    fatal?: boolean;
    message: string;
} & {
    unionIssues?: ZodIssue[][];
    unionErrors?: ZodError<any>[];
}))[];
export declare const scalars: {
    StringNumber: GraphQLScalarType<string | number, string | number>;
    ZodParsedType: GraphQLScalarType<string, string>;
};
