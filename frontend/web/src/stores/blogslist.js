import {writable} from "svelte/store";

export const blogslist = writable({
    userLists: [{
        blogsList: [{
            _id: null,
            blogTitle: null,
            blogId: null,
            author: null,
        }]
    }]
})