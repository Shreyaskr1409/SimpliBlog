import { writable } from 'svelte/store';

export const basic = writable({
    sameUser: 2,
    // 0 => not same user
    // 1 => same user
    // 2 => loading
    // 3 => not logged in (not same user)
});