# Arabic Support Center — MVP prototype

A lightweight React MVP for managing students, attendance, and assessment at
the Arabic Support Center. Built for a first feedback round with Iman before
any real backend gets built.

## Run it locally

```
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Login

- Teacher: `iman` / `Iman@2026`
- Admin:   `admin` / `Admin@2026`

(Change these in `src/App.jsx` — search for `ACCOUNTS` — whenever you want.)

## Data

Data persists in your browser's `localStorage` (see `persist()` /
`loadOrSeed()` in `src/App.jsx`, keys `asc-students-v2` / `asc-activity-v2`).
It survives refreshes and closing the tab, but it's local to whichever
browser + machine you're using — it won't follow you to a different
computer or browser. That's fine for solo testing; a real backend is the
eventual answer once more than one person needs the same data.

## Structure

```
src/
  App.jsx      the whole app (single component tree for now)
  main.jsx     React entry point
  index.css    minimal global reset
```

This still maps to the fuller folder structure (components/, pages/, data/,
i18n/) from the original plan — we just haven't split it apart yet since the
single file has been faster to iterate on together in chat.
