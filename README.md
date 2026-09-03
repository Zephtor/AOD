# AOD Studio

A small GTK4/WebKitGTK Flatpak app for designing an always-on display with HTML, CSS and JavaScript.

## Build

Install `flatpak`, `flatpak-builder`, and the GNOME 50 SDK, then run:

```sh
flatpak-builder --user --install --force-clean build io.github.Zephtor.AOD.yml
flatpak run io.github.Zephtor.AOD
```

The editor itself is local. Embedded websites use the Flatpak's network permission and may still refuse iframe embedding through their own security headers. `data/index.html`, `data/style.css`, and `data/app.js` are installed as the app's editable web surface. The native code only creates the GTK window and loads the web UI.