import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_nvJT1irtR0jg@ep-lucky-darkness-ae3xw8yj-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  }
});
