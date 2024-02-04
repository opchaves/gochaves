package website

import (
	"embed"
	"path/filepath"

	"github.com/leapkit/core/mdfs"
	"github.com/opchaves/gochaves/internal/app/config"
)

var (
	//go:embed public/*
	files embed.FS
	// Folder is a mdfs instance that contains all the files in the public folder.
	Folder = mdfs.New(files, filepath.Join("website", "public"), config.Environment)

	//go:embed public/index.html
	// Index embed.FS
)
