import { atom, useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { UserData } from "./atomTypes";

const userData = atom<UserData | undefined>(undefined)
const updateUserData = atom(
    get => get(userData),
    (_, set, param: UserData) => set(userData, param)
)

export const useUserData = () => useAtom(updateUserData)