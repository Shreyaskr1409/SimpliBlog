import { writable } from 'svelte/store';

export const userblogslist = writable({ data: { userBlogList: [] } });