'use_client'

import { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import IconButton from "../ui/buttons/IconButton";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import API from "@/utils/api/api";

export default function UserInfoIconBtn() {
    const [userId, setUserId] = useState();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        handleGetUserId()
    }, [])

    const handleGetUserId = async () => {
        await API.getUserData()
        .then(response => {
            setUserId(response.data[0]._id)
        })
    }

    return (
        <IconButton
            icon={<InformationCircleIcon className="h-5 w-5"/>}
            onClick={() => router.push(`${window.location.origin}/${pathname}/${userId}`)}
            label="User Info"
            type="default"
            visible={() => true}
        />
    )
}

