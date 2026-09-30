# DMCE EventHub — Workshop Codebase

## Project
DMCE EventHub is a progressive five-day web-development teaching project.

**Discover → Register → Participate → Showcase**

## Folder structure

dmce-eventhub/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
└── pages/
    ├── events.html
    ├── registration.html
    ├── about.html
    └── contact.html

## Five-day mapping

- Day 1: HTML structure, requirements, UX, sitemap
- Day 2: CSS, typography, colors, spacing, Flexbox, Grid and UI
- Day 3: JavaScript, DOM, events, forms and validation
- Day 4: Responsive design, DevTools, Git/GitHub, APIs/JSON concepts
- Day 5: Integration, testing, deployment and showcase

## Contact Us security/validation teaching example

The Contact Us form includes:
- Required fields and HTML attributes
- Purpose dropdown
- Name, mobile and subject patterns
- Email validation
- Message length limits
- Field-level accessible errors
- `aria-invalid` feedback
- XSS-safe status output using `textContent`
- No user input is inserted with `innerHTML`
- Client-side validation only; production systems must repeat validation server-side

### Important production note
This classroom project does not transmit or store form data. A real implementation should use HTTPS, server-side validation, output encoding, CSRF protection where applicable, rate limiting/abuse controls, secure headers/CSP, safe database queries, authentication/authorization where needed, and appropriate logging/privacy controls.

## How to run

1. Extract the folder.
2. Open `index.html` in Chrome or Edge.
3. Navigate through the pages.
4. For the Contact Us demo, open `pages/contact.html`.
5. Use browser DevTools to inspect the HTML/CSS/JS and test responsive layouts.

No build tool or server is required for this classroom starter project.
