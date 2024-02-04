# opchaves.com

Personal website+blog+apps built using Go, Hugo, Chi, HTMX, SQLite, TailwindCSS

### Clone the repo

`cd some/dir && git clone git@github.com:opchaves/gochaves.git`

### How to run

- install all deps: `make tidy`, `make install-tools`
- create env files: `make creat-env`
- install hugo:
  - option 1: if you're on MacOS, run: `brew install hugo`
  - option 2: uncomment hugo install command under `install-tools:`
- build website: `make build-dev-website`
- and finally run the server:
  - with air (live reload): `make dev`
  - without air (go run): `make run`

### Build binary

- build website
  - set production website base url within Makefile
- run the build command
  - `make build`
  - macOS specific: `make build-mac`
- running the binary locally: `make start`

### Links

- [A Golang and HTMX Todo application](https://github.com/paganotoni/todox)

### TODO

- Only load `.env*` during development
- Replace core kit mod with chi
- Remove `/blog` prefix on markdown files and have a route to handle this.
  - Alt: when building hugo have `static/img` as `static/blog/img`
  - Drawback above alt is that there must be a `/blog` route
- When hugo building website for production set correct baseURL
  - Have this command within Makefile. Name it as `build-prod-blog`?
- Enable `Cache-Control` header for the `website` build in production
  - Handle this within website handler `website/website.go`
- Use sqlite as storage and goose for migrations
