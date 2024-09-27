import { writable } from 'svelte/store';

export const blogslist = writable({ data: { userBlogList: [] } });