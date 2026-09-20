# AppSphere — APK Showcase Website

AppSphere is a modern static portfolio website for showcasing independent Android, AI, and web projects. The site is built with HTML, CSS, and JavaScript and is powered by a central app catalog in `apps-data.js`.

## Current project status

This repository is a working showcase website with the following features:

- Hero section with premium app-store style branding
- Search and category filtering for the project catalog
- App cards with metadata, tags, and live quick info
- App detail modal with description, features, screenshots, and changelog
- Direct APK/website action links for each project
- Install guide modal for sideloading APKs on Android
- Dark/light theme support with smooth UI transitions
- Animated counters, ambient background effects, and polished scrolling experience
- GitHub repository showcase section and author profile links

## Featured apps in the current catalog

The live catalog currently includes these projects:

- AI Study Assist
- Women SOS
- Talent Match AI
- Interview Pro
- Login Signup Clone
- E-commerce
- AI Face Assistant
- Carbon Foot Print
- Smart Management Web

## Tech stack

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts
- Local static assets and screenshots

## Project structure

```text
.
├── index.html              # Main website layout and sections
├── style.css              # Full responsive styling and motion design
├── script.js              # Rendering logic, filters, modal UI, theme toggle, animations
├── apps-data.js           # App metadata, project catalog, site configuration
├── assets/                # Logos, screenshots, app media, and icons
├── app/                   # App-related support files
├── README.md              # Project documentation
└── .gitignore             # Repository ignores
```

## Run locally

You can preview the site by opening `index.html` directly in a browser, or run it using a local web server:

```bash
cd "c:\Users\tanuj\Desktop\hosting website"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

This project is designed as a static showcase platform for mobile apps and web projects. App details, descriptions, screenshots, categories, download links, and website links are managed centrally in `apps-data.js` for easy updates.

## Author

Tanuj Darokar

