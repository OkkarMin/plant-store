import NextAuth from "next-auth";
import Providers from "next-auth/providers";

interface CredentialObject {
  username: string;
  password: string;
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "TheAroyHouseAccount",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "DanKarJun Organization",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialObject) {
        const { username, password } = credentials;

        const validUsernames = process.env.USERNAMES!.split(",");
        const validPasswords = process.env.PASSWORDS!.split(",");

        const isValidUser = validUsernames.includes(username);
        const isValidPassword = validPasswords.includes(password);

        if (isValidUser && isValidPassword) {
          return { name: username, email: "marcus@thearoyhouse.com" };
        }

        return null;
      },
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
});
