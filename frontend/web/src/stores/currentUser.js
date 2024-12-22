import { writable } from "svelte/store";

export const currentUser = writable({
    data: {
        username: "",
        fullname: "",
        email: "",
        _id: "",
        avatar: "",
        aboutme: "",
        socials: [
            {
                platform: "",
                username: "",
                url: "",
            },
        ],
        personalWebsiteUrl: "",
        interests: []
    },
});