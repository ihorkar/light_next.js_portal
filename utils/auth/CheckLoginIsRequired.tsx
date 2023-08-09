'use client'

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Page({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const session = useSession();
    const pathName = usePathname();

    useEffect(() => {
        console.log(session, "sesssion")
        if (!session.data) router.push("/welcome")
    }, [])

    return <>{(session.data || pathName === "/welcome") && children}</>
}