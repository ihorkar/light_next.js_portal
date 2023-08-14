import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authConfig: NextAuthOptions = {
    secret: String("process.env.NEXTAUTH_SECRET"),
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
              token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            //@ts-ignore
            session.accessToken = token.accessToken
            //@ts-ignore
            session.user.identityId = token.sub
            return session
        }
    }
}