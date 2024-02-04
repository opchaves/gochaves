package main

import (
	"fmt"
	"os"

	"github.com/leapkit/core/server"
	"github.com/opchaves/gochaves/internal/app"
	"github.com/opchaves/gochaves/internal/app/config"
)

func main() {
	s := server.New(
		"opchaves",

		server.WithPort(config.Port),
		server.WithHost(config.Host),
	)

	// Application routes
	if err := app.AddRoutes(s); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if err := s.Start(); err != nil {
		fmt.Println(err)
	}
}
