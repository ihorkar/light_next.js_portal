'use client'

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Page({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const session = useSession();
    const pathName = usePathname();
    const PathsWithoutAuth = ["/welcome", "/signup", "/accept-invitation","/signup-completed"];

    useEffect(() => {
        if (session.status !== "loading" && !session.data && !PathsWithoutAuth.includes(pathName) ) router.push("/welcome")
    }, [session])

    return <>{(session.data || PathsWithoutAuth.includes(pathName) ) && children}</>
}