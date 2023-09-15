import { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { JWT } from 'next-auth/jwt';
import { OAuthConfig } from 'next-auth/providers/oauth';
import { KeycloakProfile } from 'next-auth/providers/keycloak';

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

export const authConfig: NextAuthOptions = {
    secret: String(process.env.NEXTAUTH_SECRET),
    providers: [
        KeycloakProvider({
            clientId: String(process.env.KEYCLOAK_ID),
            clientSecret: String(process.env.KEYCLOAK_SECRET),
            issuer: String(process.env.KEYCLOAK_ISSUER),
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
              token.id_token = account.id_token
              token.provider = account.provider
              token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            //@ts-ignore
            session.accessToken = token.accessToken
            return session
        }
    },
    events: {
      async signOut({ token }: { token: JWT }) {
        if (token.provider === "keycloak") {
          const issuerUrl = (authConfig.providers.find(p => p.id === "keycloak") as OAuthConfig<KeycloakProfile>).options!.issuer!
          const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
          logOutUrl.searchParams.set("id_token_hint", token.id_token!)
          await fetch(logOutUrl);
        }
      },
    }
};