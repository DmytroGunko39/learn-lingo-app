# LearnLingo

A platform for discovering and booking online language tutoring services. Browse teachers, filter by language, level, or price, save favorites, and book a trial lesson — all in one place.

## Live Demo

_Coming soon_

## Features

- Browse language teachers with pagination (4 per page, load more)
- Filter teachers by language, student level, and price per hour
- Expand a teacher card to read full bio, conditions, and student reviews
- Book a trial lesson via a modal form
- Register and log in with email and password
- Save favorite teachers (persisted in Firebase per user)
- Favorites page (private route — accessible only when logged in)
- Toast notifications for auth events and access errors
- Responsive layout for all desktop screen sizes

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript |
| Styling | CSS Modules |
| Routing | React Router v7 |
| Forms | React Hook Form + Yup |
| Backend | Firebase Authentication + Realtime Database |
| Build | Vite 8, React Compiler |
| Notifications | react-hot-toast |

## Project Structure

```
src/
├── components/
│   ├── AuthForm/        # LoginForm and RegisterForm (react-hook-form + Yup)
│   ├── BookingForm/     # Trial lesson booking form
│   ├── Filters/         # Language / level / price dropdowns
│   ├── Header/          # Navigation + auth buttons
│   ├── Logo/            # Brand logo component
│   ├── Modal/           # Reusable portal modal (Esc / backdrop close)
│   └── TeacherCard/     # Teacher card with expand / favorite / book actions
├── context/
│   ├── AuthContext.tsx  # Firebase auth state (currentUser, isLoading)
│   └── FavoritesContext.tsx
├── firebase/
│   ├── firebaseConfig.ts
│   ├── auth.ts          # registerUser, loginUser, logoutUser
│   └── database.ts      # getTeachers (paginated), getUserFavorites, addFavorite, removeFavorite
├── hooks/
│   └── useModal.ts
├── pages/
│   ├── HomePage/        # Hero section + statistics
│   ├── TeachersPage/    # Teacher listing with filters and pagination
│   └── FavoritesPage/   # Saved teachers (private route)
└── router/
    ├── AppRouter.tsx
    └── PrivateRoute.tsx  # Redirects unauthenticated users to /
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- A Firebase project with **Authentication** (Email/Password) and **Realtime Database** enabled

### Installation

```bash
git clone https://github.com/your-username/learn-lingo-app.git
cd learn-lingo-app
npm install
```

### Environment Variables

Copy the example file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

`.env.example`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

All values are found in **Firebase Console → Project Settings → Web App**.

### Firebase Database

Upload `teachers.json` to the Realtime Database under the `/teachers` node:

1. Firebase Console → Realtime Database → ⋮ menu → **Import JSON**
2. Select `teachers.json` from the project root

Set the database rules to allow public reads:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview
```

## Deployment (Netlify)

1. Push the repository to GitHub
2. Netlify → **Add new site** → **Import from Git**
3. Build command: `npm run build` — Publish directory: `dist`
4. Add all `VITE_FIREBASE_*` variables in **Site settings → Environment variables**
5. Deploy
