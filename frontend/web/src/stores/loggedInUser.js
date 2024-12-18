import { writable } from "svelte/store";

export const loggedInUser = writable({
    _id: null,
    username: null,
    avatar: null
})