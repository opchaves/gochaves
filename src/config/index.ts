import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DB_URL: z.string().trim().min(1),
  DB_LOGGER: z.coerce.boolean().default(false),
  ID_SIZE: z.coerce.number().default(15),
});

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType { }
  }
}

const envServer = envSchema.safeParse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
  DB_LOGGER: process.env.DB_LOGGER,
  ID_SIZE: process.env.ID_SIZE,
});

if (!envServer.success) {
  console.error(envServer.error);
  process.exit(1);
}

export default envServer.data;
