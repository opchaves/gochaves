package config

import (
	"github.com/joho/godotenv"
	"os"
	"sync"
)

// oncer for the config loading
var loadOnce sync.Once

// envOr returns the value of an environment variable if
// it exists, otherwise it returns the default value
// From: https://github.com/LeapKit/core/blob/main/envor/envor.go
func Get(name, def string) string {
	// Load .env file only once
	if os.Getenv("GO_ENV") != "production" {
		loadOnce.Do(func() {
			godotenv.Load(".env")
		})
	}

	if value := os.Getenv(name); value != "" {
		return value
	}

	return def
}

var (
	Env  = Get("GO_ENV", "development")
	Port = Get("PORT", "3000")
	Host = Get("HOST", "0.0.0.0")

	IsProduction = Env == "production"
	IsLocal      = Env != "local"
)
