import { fastify as Fastify } from "./fastify.js";

const port = 3005;

try {
  const fastify = await Fastify({
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
        },
      },
    },
  });
  await fastify.listen({ port });
} catch (error) {
  console.log("Error starting server", error);
  process.exit(1);
}
