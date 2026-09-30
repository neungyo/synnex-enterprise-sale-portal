import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { database } from "@/lib/database";

export const auth = betterAuth({
  database,
  emailAndPassword: { enabled: true, disableSignUp: true },
  plugins: [admin({ defaultRole: "user" })],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await database.query("insert into profiles (user_id, role) values ($1, 'sales_rep') on conflict (user_id) do nothing", [user.id]);
        },
      },
    },
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});
