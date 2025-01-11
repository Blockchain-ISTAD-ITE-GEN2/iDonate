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
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user" as UserRole, // Default role for Google
        };
      },
    }),
    // Facebook Provider
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url,
          role: "user" as UserRole, // Default role for Facebook
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
          throw new Error("Invalid email or password.");
        }
        const user = await authService.login(credentials.email, credentials.password);
        if (!user) {
          throw new Error("Invalid credentials.");
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
      const providerPayloads = {
        google: async () => {
          const googlePayload = {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sessions/google-payload`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(googlePayload),
            }
          );

          if (!response.ok) {
            console.error("Google user registration failed:", await response.json());
            return false;
          }
        },
        facebook: async () => {
          const facebookPayload = {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              picture: user.image,
            },
            token: {
              access_token: account?.accessToken,
              expires_in: account?.expires_at,
              token_type: account?.token_type,
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sessions/facebook-payload`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(facebookPayload),
             
            }
          );

          if (!response.ok) {
            console.error("Facebook user registration failed:", await response.json());
            return false;
          }
        },
      };

      // if (account?.provider && providerPayloads[account.provider]) {
      //   try {
      //     await providerPayloads[account.provider]();
      //   } catch (error) {
      //     console.error(`Error registering user via ${account.provider}:`, error);
      //     return false;
      //   }
      // }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
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
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 24 * 60 * 60, // Session lasts 24 hours
  },
  // debug: process.env.NODE_ENV === "development",
};
