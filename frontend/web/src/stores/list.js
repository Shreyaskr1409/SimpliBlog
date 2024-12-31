import {writable} from "svelte/store";

export const list = writable({
    blogsList: [],
    createdAt: null,
    description: null,
    listAuthor: null,
    title: null,
    updatedAt: null,
    _id: null
})