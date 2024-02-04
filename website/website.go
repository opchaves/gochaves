package website

import (
	"embed"
	"errors"
	"io"
	"mime"
	"net/http"
	"path"
	"path/filepath"
)

var (
	//go:embed all:public
	files embed.FS

	rootPath = "/"
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
	err := tryRead(files, "public", r.URL.Path, w)
	if err == nil {
		return
	}

	reqDir := "public"
	if err != nil {
		if err != errDir {
			http.Error(w, "404 page not found", http.StatusNotFound)
			return
		}
		if r.URL.Path != rootPath {
			reqDir = path.Join("public", r.URL.Path)
		}
	}

	err = tryRead(files, reqDir, "index.html", w)
	if err != nil {
		http.Error(w, "404 page not found", http.StatusNotFound)
		return
	}
}
