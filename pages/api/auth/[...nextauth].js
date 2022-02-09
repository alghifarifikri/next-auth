import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRETS,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: "asdcvbtjhm",
  session: {
    jwt: true,
  },
  jwt: {
    secret: "asdcvbtjhm",
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, user, token) {
      // session.user.id = token.id;
      return session;
    },
  },
});
