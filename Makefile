.PHONY: all dev

all:
	npm run build

format:
	npm run format

dev:
	python svelte-simple-server.py

test:
	npm run test

