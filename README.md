# Fanaka Noblewealth Advisory

A static website built with HTML, CSS and browser-native JavaScript. It has no React runtime, JavaScript framework, or third-party package dependencies.

## Run locally

```sh
npm run dev
```

Open the local address printed by the server, normally `http://127.0.0.1:5173`.

## Build and preview

```sh
npm run build
npm run preview
```

The production-ready static files are written to `dist/`. The site can also be hosted directly from the project root on any static web host.

## Consultation requests

The booking form validates the selected service, meeting preferences and contact details, then prepares an email addressed to the office. A request is not submitted or confirmed until the visitor sends that email. Saving requests directly requires a separately configured backend.
