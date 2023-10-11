import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Get the value out of localStorage on load.
let stored;
try {
	stored = browser && JSON.parse(localStorage.token);
} catch (e) {
	stored = null;
}
// or localStorage.getItem('content')

// export the store, initialized with the value from localStorage
export const token = writable(stored);

// Anytime the store changes, update the localStorage value.
token.subscribe((value) => {
	if (browser) {
		if (value) {
			localStorage.setItem('token', JSON.stringify(value));
		} else {
			localStorage.removeItem('token');
		}
	}
});
