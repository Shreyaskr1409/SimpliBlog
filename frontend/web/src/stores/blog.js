import { writable } from 'svelte/store';

export const blog = writable({
    _id: null,
    author: null,
    title: "",
    subtitle: null,
    body: null,
    readerCount: null,
    shareCount: null,
    blogLinks: [],
    blogImage: [{
        imageTitle: null,
        imageurl: null,
        _id: null
    }]
});