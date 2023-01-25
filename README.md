# zod-graphql-type

ZodError GraphQL type so that you can return Zod errors in your GraphQL API.

As an example use case, let's assume you have a GraphQL mutation that signs a user into your application and it accepts Google oAuth tokens to authenticate the user. GraphQL can ensure the input types on the mutation are correct. But you might want to use zod to validate the oAuth token validation object that you get back from Google. This package allows you to return the zod validation errors in your mutation, providing crystal clear error detail to your API consumer.

This package gives you 3 things:

1. A ZodError type definition to import into your GraphQL schema
2. Custom GraphQL resolvers to make the ZodError type definition work
3. A formatErrors

## Getting started

### Installation

`npm install zod-zod-graphql-type`

### Usage

```
import { zodTypeDef } from "zod-graphql-type"
```

Then add the type definition to your GraphQL type schema.

Here is a Fastify Mercurius example:

```
import { Fastify } from "fastify"
import mercurius from "mercurius"
import { z } from "zod"
import { zodTypeDef, scalars, formatErrors } from "zod-graphql-type"

const fastify = Fastify()

const schema = `
  ${zodTypeDef},
  input ObjectToValidate {
    phrase: String
  }
  type Success {
    message: String!
  }
  type Error {
    message: String!
    zodErrors: [ZodError]
  }
  type Query {
    hello(input: ObjectToValidate): ZodError
  }
`

const resolvers = {
  Query: {
    hello: (_, { phrase }) => {
      const schema = z.object({
        phrase: z.string().max(5)
      })
      try {
        schema.parse(phrase)
        return {
          __typename: "Success",
          message: "Object passed validation."
        }
      } catch (error) {
        return {
          __typename: "Error",
          message: "Object failed vlaidation.",
          zodErrors: formatErrors(error)
        }
      }
    }
  }
}

app.register(mercurius, {
  schema,
  resolvers
})

app.get("/", async function (req, reply) {
  const query = '{ hello(input: {phrase: "worlds"})}'
  return reply.graphql(query)
})

app.listen({ port: 3000 })
```

Note that you will need to use the `formatErrors` function which replaces `ZodError` with `ZodIssue[]`. `ZodError` is of type `Error` and if you return a type of `Error` to GraphQL it will not allow you to return the ZodIssues properly.

## Features

More things than the feature below may work, but only the following issue codes are tested:

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

Currently not working and not tested:

- `ZodIssueCode.invalid_arguments` AKA z.function().args().implement()
- `ZodIssueCode.invalid_return_type` AKA z.function().returnType().implement()

## Notes

This is not yet 1.0. There are a few tests, but not enough. The null zod type does not work
