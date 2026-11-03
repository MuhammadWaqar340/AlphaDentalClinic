import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
  base: {
    env: process.env.NODE_ENV || "development",
    service: "alpha-dental-clinic",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: [
      "phone",
      "email",
      "message",
      "name",
      "req.body",
      "req.body.phone",
      "req.body.email",
      "req.body.message",
      "req.body.name",
      "payload",
      "payload.phone",
      "payload.email",
      "payload.message",
      "payload.name",
      "headers.authorization",
      "apiKey",
      "token",
      "RESEND_API_KEY",
      "UPSTASH_REDIS_REST_TOKEN",
      "SENTRY_DSN",
    ],
    remove: true,
  },
  ...(isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        },
      }),
});

export function createRequestLogger(requestId: string, route: string) {
  return logger.child({ requestId, route });
}
