import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { MercuriusContext } from "mercurius";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** string | number */
  StringNumber: any;
  /** This is an enum used by Zod internally to represent the type of a parsed value. */
  ZodParsedType: any;
  /** const enum for zod issue codes */
  ZodIssueCode: any;
  /** Accepts any type. */
  AnyType: any;
  _FieldSet: any;
};

export enum ZodValidation {
  url = "url",
  email = "email",
  uuid = "uuid",
}

export enum ZodType {
  string = "string",
  number = "number",
  array = "array",
}

export type ZodUnionIssue = {
  __typename?: "ZodUnionIssue";
  code: Scalars["ZodIssueCode"];
  expected?: Maybe<Scalars["ZodParsedType"]>;
  received?: Maybe<Scalars["ZodParsedType"]>;
  path?: Maybe<Array<Maybe<Scalars["StringNumber"]>>>;
  message: Scalars["String"];
};

export type ZodIssue = {
  __typename?: "ZodIssue";
  code: Scalars["ZodIssueCode"];
  path?: Maybe<Array<Maybe<Scalars["StringNumber"]>>>;
  message: Scalars["String"];
  expected?: Maybe<Scalars["ZodParsedType"]>;
  received?: Maybe<Scalars["String"]>;
  keys?: Maybe<Array<Maybe<Scalars["String"]>>>;
  unionIssues?: Maybe<Array<Maybe<Array<Maybe<ZodUnionIssue>>>>>;
  options?: Maybe<Array<Maybe<Scalars["String"]>>>;
  argumentsError?: Maybe<ZodIssue>;
  returnTypeError?: Maybe<ZodIssue>;
  validation?: Maybe<ZodValidation>;
  type?: Maybe<ZodType>;
  minimum?: Maybe<Scalars["Int"]>;
  maximum?: Maybe<Scalars["Int"]>;
  inclusive?: Maybe<Scalars["Boolean"]>;
  multipleOf?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  noOp?: Maybe<Scalars["Int"]>;
  /** Simple query for test. */
  checkSchema: ValidationResult;
};

export type QuerycheckSchemaArgs = {
  input?: InputMaybe<ObjectToValidate>;
};

export type ObjectToValidate = {
  string?: InputMaybe<Scalars["AnyType"]>;
  stringMax?: InputMaybe<Scalars["String"]>;
  stringCustomError?: InputMaybe<Scalars["AnyType"]>;
  number?: InputMaybe<Scalars["AnyType"]>;
  union?: InputMaybe<Scalars["AnyType"]>;
  secondUnion?: InputMaybe<Scalars["AnyType"]>;
  enum?: InputMaybe<Scalars["AnyType"]>;
  unrecognized?: InputMaybe<Scalars["AnyType"]>;
  tooSmall?: InputMaybe<Scalars["AnyType"]>;
  stringValidator?: InputMaybe<Scalars["AnyType"]>;
  date?: InputMaybe<Scalars["AnyType"]>;
  multipleOf?: InputMaybe<Scalars["Int"]>;
};

export type Success = {
  __typename?: "Success";
  message: Scalars["String"];
};

export type Error = {
  __typename?: "Error";
  message: Scalars["String"];
  zodIssues?: Maybe<Array<Maybe<ZodIssue>>>;
};

export type ValidationResult = Success | Error;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  StringNumber: ResolverTypeWrapper<Scalars["StringNumber"]>;
  ZodParsedType: ResolverTypeWrapper<Scalars["ZodParsedType"]>;
  ZodIssueCode: ResolverTypeWrapper<Scalars["ZodIssueCode"]>;
  ZodValidation: ZodValidation;
  ZodType: ZodType;
  ZodUnionIssue: ResolverTypeWrapper<ZodUnionIssue>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ZodIssue: ResolverTypeWrapper<ZodIssue>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  AnyType: ResolverTypeWrapper<Scalars["AnyType"]>;
  Query: ResolverTypeWrapper<{}>;
  ObjectToValidate: ObjectToValidate;
  Success: ResolverTypeWrapper<Success>;
  Error: ResolverTypeWrapper<Error>;
  ValidationResult: ResolversTypes["Success"] | ResolversTypes["Error"];
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  StringNumber: Scalars["StringNumber"];
  ZodParsedType: Scalars["ZodParsedType"];
  ZodIssueCode: Scalars["ZodIssueCode"];
  ZodUnionIssue: ZodUnionIssue;
  String: Scalars["String"];
  ZodIssue: ZodIssue;
  Int: Scalars["Int"];
  Boolean: Scalars["Boolean"];
  AnyType: Scalars["AnyType"];
  Query: {};
  ObjectToValidate: ObjectToValidate;
  Success: Success;
  Error: Error;
  ValidationResult:
    | ResolversParentTypes["Success"]
    | ResolversParentTypes["Error"];
};

export interface StringNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["StringNumber"], any> {
  name: "StringNumber";
}

export interface ZodParsedTypeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ZodParsedType"], any> {
  name: "ZodParsedType";
}

export interface ZodIssueCodeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ZodIssueCode"], any> {
  name: "ZodIssueCode";
}

export type ZodUnionIssueResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["ZodUnionIssue"] = ResolversParentTypes["ZodUnionIssue"]
> = {
  code?: Resolver<ResolversTypes["ZodIssueCode"], ParentType, ContextType>;
  expected?: Resolver<
    Maybe<ResolversTypes["ZodParsedType"]>,
    ParentType,
    ContextType
  >;
  received?: Resolver<
    Maybe<ResolversTypes["ZodParsedType"]>,
    ParentType,
    ContextType
  >;
  path?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["StringNumber"]>>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ZodIssueResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["ZodIssue"] = ResolversParentTypes["ZodIssue"]
> = {
  code?: Resolver<ResolversTypes["ZodIssueCode"], ParentType, ContextType>;
  path?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["StringNumber"]>>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expected?: Resolver<
    Maybe<ResolversTypes["ZodParsedType"]>,
    ParentType,
    ContextType
  >;
  received?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  keys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  unionIssues?: Resolver<
    Maybe<Array<Maybe<Array<Maybe<ResolversTypes["ZodUnionIssue"]>>>>>,
    ParentType,
    ContextType
  >;
  options?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  argumentsError?: Resolver<
    Maybe<ResolversTypes["ZodIssue"]>,
    ParentType,
    ContextType
  >;
  returnTypeError?: Resolver<
    Maybe<ResolversTypes["ZodIssue"]>,
    ParentType,
    ContextType
  >;
  validation?: Resolver<
    Maybe<ResolversTypes["ZodValidation"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["ZodType"]>, ParentType, ContextType>;
  minimum?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  maximum?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  inclusive?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  multipleOf?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface AnyTypeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["AnyType"], any> {
  name: "AnyType";
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  noOp?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  checkSchema?: Resolver<
    ResolversTypes["ValidationResult"],
    ParentType,
    ContextType,
    Partial<QuerycheckSchemaArgs>
  >;
};

export type SuccessResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Success"] = ResolversParentTypes["Success"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  zodIssues?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ZodIssue"]>>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationResultResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["ValidationResult"] = ResolversParentTypes["ValidationResult"]
> = {
  resolveType: TypeResolveFn<"Success" | "Error", ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  StringNumber?: GraphQLScalarType;
  ZodParsedType?: GraphQLScalarType;
  ZodIssueCode?: GraphQLScalarType;
  ZodUnionIssue?: ZodUnionIssueResolvers<ContextType>;
  ZodIssue?: ZodIssueResolvers<ContextType>;
  AnyType?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  ValidationResult?: ValidationResultResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  }
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  }
> {
  ZodUnionIssue?: {
    code?: LoaderResolver<Scalars["ZodIssueCode"], ZodUnionIssue, {}, TContext>;
    expected?: LoaderResolver<
      Maybe<Scalars["ZodParsedType"]>,
      ZodUnionIssue,
      {},
      TContext
    >;
    received?: LoaderResolver<
      Maybe<Scalars["ZodParsedType"]>,
      ZodUnionIssue,
      {},
      TContext
    >;
    path?: LoaderResolver<
      Maybe<Array<Maybe<Scalars["StringNumber"]>>>,
      ZodUnionIssue,
      {},
      TContext
    >;
    message?: LoaderResolver<Scalars["String"], ZodUnionIssue, {}, TContext>;
  };

  ZodIssue?: {
    code?: LoaderResolver<Scalars["ZodIssueCode"], ZodIssue, {}, TContext>;
    path?: LoaderResolver<
      Maybe<Array<Maybe<Scalars["StringNumber"]>>>,
      ZodIssue,
      {},
      TContext
    >;
    message?: LoaderResolver<Scalars["String"], ZodIssue, {}, TContext>;
    expected?: LoaderResolver<
      Maybe<Scalars["ZodParsedType"]>,
      ZodIssue,
      {},
      TContext
    >;
    received?: LoaderResolver<Maybe<Scalars["String"]>, ZodIssue, {}, TContext>;
    keys?: LoaderResolver<
      Maybe<Array<Maybe<Scalars["String"]>>>,
      ZodIssue,
      {},
      TContext
    >;
    unionIssues?: LoaderResolver<
      Maybe<Array<Maybe<ZodUnionIssue>>>,
      ZodIssue,
      {},
      TContext
    >;
    options?: LoaderResolver<
      Maybe<Array<Maybe<Scalars["String"]>>>,
      ZodIssue,
      {},
      TContext
    >;
    argumentsError?: LoaderResolver<Maybe<ZodIssue>, ZodIssue, {}, TContext>;
    returnTypeError?: LoaderResolver<Maybe<ZodIssue>, ZodIssue, {}, TContext>;
    validation?: LoaderResolver<Maybe<ZodValidation>, ZodIssue, {}, TContext>;
    type?: LoaderResolver<Maybe<ZodType>, ZodIssue, {}, TContext>;
    minimum?: LoaderResolver<Maybe<Scalars["Int"]>, ZodIssue, {}, TContext>;
    maximum?: LoaderResolver<Maybe<Scalars["Int"]>, ZodIssue, {}, TContext>;
    inclusive?: LoaderResolver<
      Maybe<Scalars["Boolean"]>,
      ZodIssue,
      {},
      TContext
    >;
    multipleOf?: LoaderResolver<Maybe<Scalars["Int"]>, ZodIssue, {}, TContext>;
  };

  Success?: {
    message?: LoaderResolver<Scalars["String"], Success, {}, TContext>;
  };

  Error?: {
    message?: LoaderResolver<Scalars["String"], Error, {}, TContext>;
    zodIssues?: LoaderResolver<
      Maybe<Array<Maybe<ZodIssue>>>,
      Error,
      {},
      TContext
    >;
  };
}
export type checkSchemaQueryVariables = Exact<{
  string?: InputMaybe<Scalars["AnyType"]>;
  stringMax?: InputMaybe<Scalars["String"]>;
  number?: InputMaybe<Scalars["AnyType"]>;
  stringCustomError?: InputMaybe<Scalars["AnyType"]>;
  union?: InputMaybe<Scalars["AnyType"]>;
  secondUnion?: InputMaybe<Scalars["AnyType"]>;
  enum?: InputMaybe<Scalars["AnyType"]>;
  unrecognized?: InputMaybe<Scalars["AnyType"]>;
  tooSmall?: InputMaybe<Scalars["AnyType"]>;
  stringValidator?: InputMaybe<Scalars["AnyType"]>;
  date?: InputMaybe<Scalars["AnyType"]>;
  multipleOf?: InputMaybe<Scalars["Int"]>;
}>;

export type checkSchemaQuery = {
  __typename?: "Query";
  checkSchema:
    | { __typename?: "Success" }
    | {
        __typename: "Error";
        message: string;
        zodIssues?: Array<{
          __typename?: "ZodIssue";
          code: any;
          message: string;
          path?: Array<any | null> | null;
          expected?: any | null;
          received?: string | null;
          keys?: Array<string | null> | null;
          options?: Array<string | null> | null;
          validation?: ZodValidation | null;
          type?: ZodType | null;
          minimum?: number | null;
          maximum?: number | null;
          inclusive?: boolean | null;
          multipleOf?: number | null;
          unionIssues?: Array<Array<{
            __typename?: "ZodUnionIssue";
            code: any;
            expected?: any | null;
            received?: any | null;
            path?: Array<any | null> | null;
            message: string;
          } | null> | null> | null;
        } | null> | null;
      };
};

export const checkSchemaDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "checkSchema" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "string" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stringMax" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "number" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stringCustomError" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "union" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "secondUnion" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "enum" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "unrecognized" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "tooSmall" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "stringValidator" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "AnyType" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "multipleOf" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "checkSchema" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "string" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "string" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "stringMax" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "stringMax" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "number" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "number" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "stringCustomError" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "stringCustomError" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "union" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "union" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "secondUnion" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "secondUnion" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "enum" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "enum" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "unrecognized" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "unrecognized" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "tooSmall" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "tooSmall" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "stringValidator" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "stringValidator" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "date" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "date" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "multipleOf" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "multipleOf" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "Error" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "zodIssues" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "code" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "path" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "expected" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "received" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "keys" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "unionIssues" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "code" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "expected" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "received" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "path" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "message" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "options" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "validation" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "minimum" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "maximum" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "inclusive" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "multipleOf" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<checkSchemaQuery, checkSchemaQueryVariables>;
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
