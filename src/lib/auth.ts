import { betterAuth } from "better-auth";
import { database } from "@/lib/database";

export const auth = betterAuth({
  database,
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});
