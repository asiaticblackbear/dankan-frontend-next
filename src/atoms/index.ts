import {atom} from "recoil"
import {User} from "@models/user";
import {Univ} from "@models/univ";
import {Session} from "@models/session";

export const userState = atom<User>({
    key: "user",
    default: {
        cifNo: "",
        nime: "",
        univZipCd: "",
        point: 0
    },
})

export const univState = atom<Univ | null>({
    key: "location",
    default: null,
})

export const currentStoreState = atom<Session | null>({
    key: "store",
    default: null,
})