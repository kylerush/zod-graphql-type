import "dotenv/config.js";
import { fastify as Fastify, FastifyServerOptions } from "fastify";
import mercurius from "mercurius";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { codegenMercurius } from "mercurius-codegen";
import { zodTypeDef, scalars } from "../index.js";
import { checkSchemaResolver, checkSchemaTypeDef } from "./check-schema.js";
import { GraphQLScalarType } from "graphql";

export async function fastify(options: FastifyServerOptions = {}) {
  const fastify = await Fastify(options);

  const rootSchema = `
    scalar AnyType
    type Query {
      noOp: Int
    }
  `;

  const AnyType = new GraphQLScalarType({
    name: "AnyType",
    description: "Accepts any type.",
    serialize: AnyTypeParse,
    parseValue: AnyTypeParse,
    parseLiteral: AnyTypeParse,
  });

  const resolvers = {
    AnyType,
    ...scalars,
    Query: {
      ...checkSchemaResolver,
    },
  };

  const typeDefs: string[] = [zodTypeDef, rootSchema, checkSchemaTypeDef];

  void fastify.register(mercurius, {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    resolvers,
    graphiql: true,
  });

  if (process.env.NODE_ENV !== "test") {
    await codegenMercurius(fastify, {
      targetPath: "./types/graphql/generated.ts",
      silent: false,
      operationsGlob: "./test/graphql/operations/**/*.gql",
    });
  }

  return fastify;
}

function AnyTypeParse(value: unknown) {
  return value;
}
