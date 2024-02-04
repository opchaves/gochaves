MODULE := $(shell go list -m)

export PROJECT = ${MODULE}
# build webiste with dev url.
export WEBSITE_BASE_URL=http://localhost:3000/blog

dev:
	air

run:
	go run ./main.go

# run this before `make dev`
# you only need to run this when you change the website
build-dev-website:
	cd website && hugo --baseURL ${WEBSITE_BASE_URL}

install-tools:
	go install github.com/cosmtrek/air@latest
	# go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	# go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	# CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
