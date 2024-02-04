package app

import (
	"net/http"

	"github.com/go-chi/chi/v5/middleware"
	"github.com/leapkit/core/server"
	"github.com/opchaves/gochaves/website"
)

// AddRoutes mounts the routes for the application,
// it assumes that the base services have been injected
// in the creation of the server instance.
func AddRoutes(r *server.Instance) error {
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello world"))
	})

	// TODO make it work without `/` suffix
	// Mount the website folder to be served openly
	// r.HandleFunc("/blog", func(w http.ResponseWriter, r *http.Request) {
	// 	http.FileServer(http.FS(website.Index)).ServeHTTP(w, r)
	// })
	r.Folder("/blog/", website.Folder)

	return nil
}
