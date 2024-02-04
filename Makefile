MODULE := $(shell go list -m)

export PROJECT = ${MODULE}

dev:
	air

run:
	go run ./main.go

install-tools:
	go install github.com/cosmtrek/air@latest
