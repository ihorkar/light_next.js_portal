import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
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

export async function loginIsRequiredServer() {
    const session = await getServerSession(authConfig);
    if (!session) return( redirect("/welcome"))
}

export function loginIsRequiredClient() {
    if (typeof window !== "undefined") {
        const session = useSession();
        const router = useRouter();
        if (!session) router.push("/welcome")
    }
}