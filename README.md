# LearnLingo

A platform for discovering and booking online language tutoring services. Browse teachers, filter by language, level, or price, save favorites, and book a trial lesson — all in one place.

## Live Demo

[https://learn-lingo-app-tawny.vercel.app/](https://learn-lingo-app-tawny.vercel.app/)

## Design

[Figma](https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=0-1&t=5iqedzV4dpbOviGp-1)

## Features

- Browse language teachers with pagination (4 per page, load more)
- Filter teachers by language, student level, and price per hour via custom accessible dropdowns
- Expand a teacher card to read full bio, conditions, and student reviews
- Book a trial lesson via a modal form (submissions saved to Firebase)
- Register and log in with email and password
- Save favorite teachers (persisted in Firebase per user)
- Favorites page (private route — accessible only when logged in)
- Toast notifications for auth events and access errors
- Loading spinner while fetching teacher data
- Fully responsive layout across mobile, tablet, and desktop screens

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19.2, TypeScript 6.0 |
| Styling | CSS Modules |
| Routing | React Router 7.15 |
| Forms | React Hook Form 7.76 + Yup 1.7 |
| Backend | Firebase 12.13 (Authentication + Realtime Database) |
| Build | Vite 8, React Compiler (via `@rolldown/plugin-babel`) |
| Notifications | react-hot-toast 2.6 |
| Linting | ESLint 10 + typescript-eslint |

## Project Structure

```
src/
├── assets/
│   └── icons/           # Inline SVG icon components (Book, Chevron, Close, Eye, Heart, Logo, OnlineDot, Star, StatsBorder)
├── components/
│   ├── AuthForm/        # LoginForm and RegisterForm (react-hook-form + Yup)
│   ├── BookingForm/     # Trial lesson booking form
│   ├── CustomSelect/    # Accessible custom dropdown used by Filters
│   ├── Filters/         # Language / level / price dropdowns
│   ├── Header/          # Navigation + auth buttons
│   ├── Logo/            # Brand logo component
│   ├── Modal/           # Reusable portal modal (Esc / backdrop close)
│   ├── Spinner/         # Loading spinner overlay
│   └── TeacherCard/     # Teacher card with expand / favorite / book actions
├── context/
│   ├── AuthContext.tsx       # AuthProvider (currentUser, isLoading)
│   ├── auth-context.ts       # createContext instance for auth
│   ├── FavoritesContext.tsx  # FavoritesProvider (favorites, toggleFavorite)
│   └── favorites-context.ts  # createContext instance for favorites
├── firebase/
│   ├── firebaseConfig.ts
│   ├── auth.ts          # registerUser, loginUser, logoutUser, getCurrentUser
│   └── database.ts      # getTeachers (paginated), getAllTeachers, getTeacherById, getUserFavorites, addFavorite, removeFavorite, saveBooking
├── hooks/
│   ├── useAuth.ts       # Consumes AuthContext
│   ├── useFavorites.ts  # Consumes FavoritesContext
│   └── useModal.ts
├── pages/
│   ├── HomePage/        # Hero section + statistics
│   ├── TeachersPage/    # Teacher listing with filters and pagination
│   └── FavoritesPage/   # Saved teachers (private route)
├── router/
│   ├── AppRouter.tsx
│   └── PrivateRoute.tsx  # Redirects unauthenticated users to /
├── types/
│   ├── booking.ts
│   ├── filters.ts
│   └── teacher.ts
├── utils/
│   ├── extractUniqueValues.ts  # Derives available languages/levels from teacher data
│   └── filterTeachers.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- A Firebase project with **Authentication** (Email/Password) and **Realtime Database** enabled

### Installation

```bash
git clone https://github.com/DmytroGunko39/learn-lingo-app.git
cd learn-lingo-app
npm install
```

### Environment Variables

Create a `.env` file in the project root with your Firebase credentials:

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

The app reads teacher data from a `/teachers` node and writes to `/favorites/{uid}` and `/bookings` in the Realtime Database. Populate `/teachers` with records matching the `Teacher` type in [`src/types/teacher.ts`](src/types/teacher.ts) (name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience), either by adding entries manually in the Firebase Console or by importing your own JSON export under the `teachers` node.

Set the database rules so teachers are publicly readable (writable only via the Firebase Console), favorites are scoped to their owner, and bookings require authentication:

```json
{
  "rules": {
    "teachers": {
      ".read": true,
      ".write": false
    },
    "favorites": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "bookings": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
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

## Deployment (Vercel)

1. Push the repository to GitHub
2. Vercel → **Add New Project** → import the GitHub repository
3. Framework preset: **Vite** — Build command: `npm run build` — Output directory: `dist`
4. Add all `VITE_FIREBASE_*` variables in **Project Settings → Environment Variables**
5. Deploy

Vercel's Vite preset detects client-side routing automatically, so direct navigation to routes like `/teachers` or `/favorites` works out of the box with no extra configuration.
