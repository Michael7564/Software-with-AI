# Marginalia — login / signup / dashboard + Back4app

Plain HTML/CSS/JS, three separate pages, no build step.

## 1. Back4app setup

1. In your Back4app app dashboard, go to **Database** and create a class
   called `Note` with these columns:
   - `title` (String)
   - `body` (String)
   - `owner` (Pointer to `_User`)
2. Go to **Database > Note > Security (CLP)** and restrict Find/Get/Update/
   Delete/Create to "Requires authentication". The app also sets a
   per-object ACL on every note it creates, so each user only ever sees
   their own notes.
3. Grab your keys from **App Settings > Security & Keys**: Application ID
   and JavaScript Key.

## 2. Local setup

```bash
cd note-app-pro
cp js/config.example.js js/config.js
# edit js/config.js and paste in your Application ID and JavaScript Key
```

Then open `login.html` in your browser — that's the entry point.
`js/config.js` is in `.gitignore` so your real keys never get committed.

(If your browser blocks anything opening files directly, run a quick local
server instead: `python3 -m http.server` from inside the folder, then
visit `http://localhost:8000/login.html`.)

## 3. Pages

- `login.html` — log in; redirects to `dashboard.html` if already logged in
- `signup.html` — create an account; logs you in and redirects automatically
- `dashboard.html` — the notes workspace (list, create, edit, delete);
  redirects back to `login.html` if there's no active session

## 4. What's included

- `js/parse-init.js` — initializes the Parse SDK from `js/config.js`,
  loaded on every page
- `js/login.js` / `js/signup.js` — auth screens
- `js/dashboard.js` — auth guard + full CRUD against the `Note` class
- `css/style.css` — shared dark theme across all three pages
