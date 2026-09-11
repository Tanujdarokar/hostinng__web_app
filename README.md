# AppSphere — APK Showcase Website

AppSphere is a static portfolio and app marketplace website for showcasing independent Android, AI, Flutter, and web projects. The current implementation uses HTML, CSS, and JavaScript with a data-driven catalog defined in `apps-data.js`.

## Current Project Status

The repository currently presents a public-facing product website with:

- A hero section and app-market based brand layout
- A login/register panel and workspace style UX
- An APK sideloading banner and install guide flow
- A searchable and filterable app catalog
- App detail modals with screenshots and changelog sections
- Dark/light theme switching
- Download and GitHub/website action links for each project

## Available Showcase Apps

The current catalog in `apps-data.js` includes the following projects:

- AI Study Assist
- Women SOS
- Talent Match AI
- Interview Pro
- Login Signup Clone
- E-commerce
- AI Face Assistant
- Carbon Foot Print
- Smart Management Web

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Font Awesome icons
- Google Fonts
- Local project assets and screenshots

## Project Structure

```text
.
├── index.html              # Main markup and website layout
├── style.css               # Full website styling and responsive design
├── script.js               # Rendering, filters, search, theme toggle, and modal logic
├── apps-data.js            # App catalog, site configuration and project metadata
├── assets/                 # Screenshots, icons, logos, and project media
└── README.md               # Project documentation
```

## Local Run

You can run this static site locally by opening `index.html` directly in a browser, or by serving the workspace with a local HTTP server:

```powershell
cd c:\Users\tanuj\Desktop\hosting website
python -m http.server 8000
```

Then visit:

http://localhost:8000

## Notes

This project is designed as a static portfolio-style APK and web showcase. App metadata, screenshots, project descriptions, project categories, download URLs, and website URLs are centrally stored in `apps-data.js`.

## Author

Tanuj Darokar

