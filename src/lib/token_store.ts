import { writable } from 'svelte/store';
import { browser } from '$app/environment';

console.log('token_store browser', browser);

// Get the value out of localStorage on load.
const stored = browser && localStorage.token;
// or localStorage.getItem('content')

// export the store, initialized with the value from localStorage
export const token = writable(stored);

// Anytime the store changes, update the localStorage value.
token.subscribe((value) => {
	if (browser) {
		if (value) {
			localStorage.setItem('token', value);
		} else {
			localStorage.removeItem('token');
		}
	}
});
