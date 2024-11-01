import { writable } from "svelte/store";

export const settingSheet = writable(
    {
        openEditInfo: false,
        openShareUsr: false,
        openEditImage: false,
    }
)