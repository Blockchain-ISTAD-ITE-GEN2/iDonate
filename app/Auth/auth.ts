import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const host = process.env.NEXT_PUBLIC_URL || "https://idonateapi.kangtido.life";

const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: any }) {
      if (user) {
        return true;
      } else {
        return "/login";
      }
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  debug: true,
};

// Export the default API route handler
export default NextAuth(authOptions);
