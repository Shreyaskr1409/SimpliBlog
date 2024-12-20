import { writable } from 'svelte/store';

export const user = writable({
	_id: null,
	username: '',
	fullname: '',
	avatar: '',
	createdAt: '',
	aboutme: null,
	socials: [],
	personalWebsiteUrl: '',
	interests: []
});