
.PHONY: build

build:
	pnpm build
	[ -d public ] && rm -r public
	[ -d backend/public ] && rm -r backend/public
	cp -r dist public
	cp -r dist backend/public

