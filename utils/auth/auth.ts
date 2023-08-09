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
    ]

    }