import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { authService } from "@/redux/services/auth-service";
import { UserRole } from "@/difinitions/types/media/user";
export const authConfig: NextAuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user" as UserRole,
        };
      },
    }),
    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url,
          role: "user" as UserRole,
        };
      },
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await authService.login(
          credentials.email,
          credentials.password,
        );
        if (!user) {
          return null;
        }
        return {
          id: user.id,
          name: user.firstname,
          email: user.email,
          role: user.role,
          image: user.avartar,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Register or update user via API
        const gogolepayload = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };

        console.log("gogolepayload", gogolepayload);

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sessions/google-payload`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(gogolepayload),
            },
          );

          if (!response.ok) {
            console.error(
              "Failed to register user via API:",
              await response.json(),
            );
            return false; // Prevent sign-in if API registration fails
          }
        } catch (error) {
          console.error("Error during user registration via API:", error);
          return false;
        }
      }
      return true; // Allow sign-in for all providers
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account?.provider === "facebook") {
        token.role = "user"; // Default role for social providers
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  session: {},
  // debug: process.env.NODE_ENV === "development",
};
