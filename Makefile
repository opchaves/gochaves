MODULE := $(shell go list -m)

export PROJECT=${MODULE}
export WEBSITE_URL=/

# TODO read env variable from .env

dev:
	air

run:
	go run ./cmd/app/main.go

build:
	env GOOS=linux GOARCH=amd64 go build -o bin/server $(PROJECT)/cmd/app
	chmod +x bin/server

build-mac:
	env GOOS=darwin GOARCH=amd64 go build -o bin/server $(PROJECT)/cmd/app
	chmod +x bin/server

# run this before `make dev`
# you only need to run this when you change the website
build-website:
	cd website && hugo --baseURL ${WEBSITE_URL}

start:
	./bin/server

tidy:
	go mod tidy

create-env:
	cp .env.example .env && cp .env.example .env.test

# You could also install hugo on macOS with `brew install hugo`
install-tools:
	go install github.com/cosmtrek/air@latest
	# CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
	# go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	# go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
