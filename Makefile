.PHONY: all dev

all:
	npm run build

format:
	npm run format

dev:
	cd build; python -m http.server
