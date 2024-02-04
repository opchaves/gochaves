package website

import (
	"embed"
	"errors"
	"io"
	"mime"
	"net/http"
	"path"
	"path/filepath"
	"strings"
)

var (
	//go:embed all:public
	files embed.FS

	rootPath = "/"
	sitePath = "/blog"
	errDir   = errors.New("path is dir")
)

// TODO load dir instead of embed during development as todox does???

func tryRead(fs embed.FS, prefix, requestedPath string, w http.ResponseWriter) error {
	f, err := fs.Open(path.Join(prefix, requestedPath))
	if err != nil {
		return err
	}
	defer f.Close()

	stat, _ := f.Stat()
	if stat.IsDir() {
		return errDir
	}

	contentType := mime.TypeByExtension(filepath.Ext(requestedPath))
	w.Header().Set("Content-Type", contentType)
	_, err = io.Copy(w, f)
	return err
}

// TODO enable cache control in production
func WebsiteHandler(w http.ResponseWriter, r *http.Request) {
	// NOTE: not really needed since this handler is invoked within route `/blog`
	// reqPath := r.URL.Path
	// if strings.HasPrefix(rPath, sitePath) {
	// 	reqPath = strings.TrimPrefix(rPath, sitePath)
	// }

	reqPath := strings.TrimPrefix(r.URL.Path, sitePath)
	err := tryRead(files, "public", reqPath, w)
	if err == nil {
		return
	}

	reqDir := "public"
	if err != nil {
		if err != errDir {
			// TODO render 404 page
			http.Error(w, "404 page not found", http.StatusNotFound)
			return
		}
		if reqPath != rootPath {
			reqDir = path.Join("public", reqPath)
		}
	}

	err = tryRead(files, reqDir, "index.html", w)
	if err != nil {
		// TODO render 404 page
		http.Error(w, "404 page not found", http.StatusNotFound)
		return
	}
}
