# Marginalia — login / signup / dashboard + Back4app

Plain HTML/CSS/JS, three separate pages, no build step.

## 1. Back4app setup

1. In your Back4app app dashboard, go to **Database** and create a class
   called `Note` with these columns:
   - `title` (String, required)
   - `body` (String)
   - `owner` (Pointer to `_User`, required)
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

Then open `login.html` (or `index.html`, which redirects there) in your
browser.

Note: Back4app's Application ID and JavaScript Key are meant to be used
client-side and are safe to commit — your real protection comes from the
CLP settings above, not from hiding these two keys. (The separate *Master
Key* must never be committed or exposed — this app never uses it.)

(If your browser blocks anything opening files directly, run a quick local
server instead: `python3 -m http.server` from inside the folder, then
visit `http://localhost:8000`.)

## 3. Pages

- `index.html` — redirects to `login.html`
- `login.html` — log in; redirects to `dashboard.html` if already logged in
- `signup.html` — create an account; logs you in and redirects automatically
- `dashboard.html` — the notes workspace (list, create, edit, delete);
  redirects back to `login.html` if there's no active session

## 4. What's included

- `js/parse-init.js` — initializes the Parse SDK from `js/config.js`,
  loaded on every page
- `js/login.js` / `js/signup.js` — auth screens
- `js/dashboard.js` — auth guard + full CRUD against the `Note` class
- `css/style.css` — shared dark theme across all pages

## 5. Deploying to Netlify

1. Push this repo to GitHub (see the root of the repo for git steps).
2. In Netlify, "Add new site" > "Import an existing project" > pick your
   GitHub repo.
3. Leave the build command empty, and set the publish directory to
   `note-app-pro` (since the app lives in that subfolder).
4. Deploy. Visit `your-site.netlify.app` — `index.html` will redirect you
   to the login screen.
