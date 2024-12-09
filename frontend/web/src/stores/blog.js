import { writable } from 'svelte/store';

export const blog = writable({
    statusCode: null,
    message: null,
    data: {
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
    }
});