# TS-AppStack — APK Showcase Website

A static portfolio and APK showcase website for publishing independent Flutter and Dart mobile apps. The site presents app cards, category filters, search, direct APK download links, app details, screenshots, and a guide for sideloading APK files on Android.

## Project Overview

This project is a mobile application showcase website built with HTML, CSS, JavaScript, and static asset data. It is designed for GitHub Pages or any static web hosting environment and is intended to present multiple Flutter-built applications in a clean product-market-store style.

## What This Website Includes

- App catalog with cards and app metadata
- Category tab filters
- Live search by title, tagline, category, description, and feature keywords
- App detail modal with screenshots and changelog
- APK download CTA links
- Sideloading installation guide modal
- Theme toggle with dark/light mode
- Repository listing UI for the developer profile

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Font Awesome icons
- Google Fonts
- Static file assets stored in the local project folders

## Project Structure

```text
.
├── index.html              # Main website markup and layout
├── style.css               # Full styling and responsive design system
├── script.js               # UI rendering, search, filters, modals, lightbox, and theme logic
├── apps-data.js            # App catalog and site configuration data
├── assets/                 # Project screenshots, icons, and app media
└── README.md               # Project documentation
```

## Local Run

You can run the project locally by opening the `index.html` file in a browser, or by serving the folder with a simple static web server.

Example:

```powershell
cd c:\Users\tanuj\Desktop\hosting website
python -m http.server 8000
```

Then open:

http://localhost:8000

## Assets and Copyright Notice

This project uses local project assets, screenshots, icons, and app metadata stored in the repository. External assets such as Google Fonts, Font Awesome, and remote preview images are used only as website styling and visual references. Please ensure that all images, screenshots, logos, APK files, and project assets you publish in this repository belong to you or carry the correct license before pushing to GitHub.

## License

This project is currently published as a portfolio/showcase website without a separate public license file. If you intend to publish it publicly, add an appropriate license such as MIT or Apache-2.0 and keep the repository license consistent with your selected app/assets sources.

## Author

Tanuj Darokar

