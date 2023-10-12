import { atom, useAtom } from "jotai";
import { atomWithReset, atomWithStorage, useResetAtom } from "jotai/utils";
import { UserData } from "./atomTypes";

const userData = atom<UserData | undefined>(undefined)
const updateUserData = atom(
    get => get(userData),
    (_, set, param: UserData) => set(userData, param)
)

export const useUserData = () => useAtom(updateUserData)

const navState = atomWithStorage("navState", true);
const updateNavState = atom(
    get => get(navState),
    (_get, set, param: boolean) => set(navState, param)
);

export const useNavState = () => useAtom(updateNavState);