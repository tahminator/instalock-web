package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Instalock - Desktop Client",
		Width:  1536,
		Height: 864,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		HideWindowOnClose: true,
		BackgroundColour:  &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:         app.startup,
		Bind: []interface{}{
			app,
		},
		Mac: &mac.Options{
			About: &mac.AboutInfo{
				Title:   "Instalock - Desktop Client",
				Message: "© 2025\nTahmid Ahmed\ngithub.com/tahminator",
			},
			Appearance: "NSAppearanceNameDarkAqua",
			TitleBar:   mac.TitleBarHiddenInset(),
		},
		Windows: &windows.Options{
			IsZoomControlEnabled: false,
			DisablePinchZoom:     true,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
