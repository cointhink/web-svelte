import { writable } from 'svelte/store';
import { browser } from '$app/environment';

console.log('token_store browser', browser);

// Get the value out of storage on load.
const stored = browser ? localStorage.token : '';
// or localStorage.getItem('content')

// Set the stored value or a sane default.
export const token = writable(stored || '');

// Anytime the store changes, update the local storage value.
token.subscribe((value) => (browser ? (localStorage.token = value) : ''));
// or localStorage.setItem('content', value)
