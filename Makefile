MODULE := $(shell go list -m)

export PROJECT = ${MODULE}

dev:
	air

run:
	go run ./main.go

install-tools:
	go install github.com/cosmtrek/air@latest
	# go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	# go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	# CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
