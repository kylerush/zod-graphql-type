# zod-graphql-type

`ZodError` GraphQL type so that you can return [`zod`](https://github.com/colinhacks/zod) errors in your GraphQL API.

As an example use case, let's assume you have a GraphQL mutation that signs a user into your application. The mutation accepts a Google oAuth token to authenticate the user. GraphQL can ensure the input types on the mutation are correct. However, in your GraphQL resolver, you will want to verify the integrity of the oAuth token. Once you verify the integrity of the token, you can validate the token object with a zod schema. This package allows you to return any errors that zod throws for crystal clear error detail to your API consumer.

This package gives you 3 things:

1. A ZodError type definition to import into your GraphQL schema for use in other types;
2. Custom GraphQL resolvers to make the ZodError type definition work;
3. A formatErrors `zodErrorsTozodIssues` function to transform ZodError (has `Error` objects in it so it doesn't work with GraphQL nicely) into ZodIssues (no `Error` object).

## Getting started

### Installation

`npm install zod-zod-graphql-type`

### Usage

```js
import { zodTypeDef } from "zod-graphql-type";
```

Then add the type definition to your GraphQL type schema.

Here is a Fastify Mercurius example:

```js
import { Fastify } from "fastify";
import mercurius from "mercurius";
import { z } from "zod";
import { zodTypeDef, scalars, zodErrorsTozodIssues } from "zod-graphql-type";

const fastify = Fastify();

const schema = `
  ${zodTypeDef},
  input ObjectToValidate {
    phraseFirstHalf: String
  }
  type Success {
    message: String!
  }
  type Error {
    message: String!
    zodIssues: [ZodIssue]
  }
  type Query {
    validatePhrase(input: ObjectToValidate): Success | Error
  }
`;

const resolvers = {
  Query: {
    validatePhrase: (_, { phrase }) => {
      const phraseSecondHalf = fetch(`https://someapi.com?phrase=${phrase}`);
      // Create a zod schema to validate the argument
      const schema = z.object({
        phrase: z.literal("world"),
      });
      try {
        schema.parse(phraseSecondHalf);
        return {
          __typename: "Success",
          message: "Object passed validation.",
        };
      } catch (error) {
        return {
          __typename: "Error",
          message: "Object failed vlaidation.",
          zodIssues: zodErrorsTozodIssues(error),
        };
      }
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
});

app.get("/", async function (req, reply) {
  const query = '{ validatePhrase(input: {phraseFirstHalf: "world"})}';
  return reply.graphql(query);
});

app.listen({ port: 3000 });
```

Note that you will need to use the `formatErrors` function which replaces `ZodError` with `ZodIssue[]`. `ZodError` is of type `Error` and if you return a type of `Error` to GraphQL it will not allow you to return the ZodIssues properly.

## Features

The vast majority of ZodError types are tested and working. The following are tested:

- `ZodIssueCode.invalid_type`
- `ZodIssueCode.unrecognized_keys`
- `ZodIssueCode.invalid_union`
- `ZodIssueCode.invalid_enum_value`
- `ZodIssueCode.too_big`
- `ZodIssueCode.too_small`
- `ZodIssueCode.invalid_type => custom error`
- `ZodIssueCode.invalid_string`
- `ZodIssueCode.invalid_date`
- `ZodIssueCode.not_multiple_of`

The following are known to not work yet (support could be added in the future):

- `ZodIssueCode.invalid_arguments` an error produced from `z.function().args().implement()`
- `ZodIssueCode.invalid_return_type` an error produced from `z.function().returnType().implement()`

Everything other than `z.function()` function schemas that use `.implement()` should be working properly. If you find a bug, please create an issue.

## Notes

This is not yet a 1.0.0 release. Since this is under active development, versioning won't follow SEMVER until 1.0.0.
