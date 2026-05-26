# DropIt

A Google TV app that runs a local web server, allowing users on the same network to upload files via a browser for sideloading onto the TV.

## Project Info

- **App name**: DropIt
- **Package name**: com.keegoo.dropit
- **Platform**: Google TV / Android TV
- **Language**: Kotlin
- **Min SDK**: API 26
- **Target SDK**: API 34

## How It Works

1. User opens DropIt on the Google TV
2. App starts a local HTTP server and displays the device IP + port on screen
3. User visits that URL from a laptop browser on the same network
4. User uploads a file via drag-and-drop in the browser

## Key Dependencies

- **Ktor** or **NanoHTTPD** — embedded HTTP server
- **Jetpack Leanback** or **Compose for TV** — TV UI

## Permissions Required

- `INTERNET` — to run the local web server
- `WRITE_EXTERNAL_STORAGE` — to save received files

## Development Setup

- IDE: Android Studio Meerkat (2024.3.1) or Zed with Kotlin LSP
- Build: Gradle via `./gradlew`
- Deploy: ADB sideload or Android Studio run configuration
- Test device: Physical Google TV device recommended over emulator
