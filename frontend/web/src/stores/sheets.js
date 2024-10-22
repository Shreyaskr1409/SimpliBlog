import { writable } from "svelte/store";

export const settingSheet = writable(
    {
        option: "",
        open: false
    }
)