# LearnLingo — Full Project Plan

**Stack:** React + Vite · CSS Modules · React Context · Firebase (Auth + Realtime DB) · React Router v6 · react-hook-form + Yup

---

## TRANSLATION OF TECHNICAL SPECIFICATION

**App:** A platform for a company offering online language tutoring services.

### 3 Pages:

- **Home** — company advantages + CTA button → redirects to Teachers page
- **Teachers** — list of teachers with filters (language, student level, price/hour)
- **Favorites** _(private)_ — teachers added to favorites by the logged-in user

### Requirements:

1. Firebase Authentication (register, login, get current user, logout)
2. Auth forms built with react-hook-form & Yup. Modal closes on ✕ button, backdrop click, or Esc key
3. Firebase Realtime Database — teachers collection with fields: `name`, `surname`, `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`, `conditions`, `experience`
4. Teacher card UI matching Figma design
5. Teachers page shows 4 cards initially → Load More button fetches next batch from DB
6. Heart (favorite) button:
   - **Unauthorized user** → show modal/toast: "Feature available for authorized users only"
   - **Authorized user** → add/remove from favorites in Firebase, heart color changes
7. Favorites persist on page refresh (stored in Firebase users collection)
8. Second click on heart removes teacher from favorites
9. "Read more" button expands the card with full details + student reviews
10. "Book trial lesson" button opens a modal with a booking form (react-hook-form + Yup), all fields required
11. Modal closes on ✕, backdrop click, or Esc
12. Favorites page (private route) — same styling as Teachers page

### Bonus:

- React Router routing
- Filters: by language, student level, price per hour

---

## PROJECT STRUCTURE (to set up at the start)✅

```
src/
├── components/
│   ├── Header/
│   ├── Modal/
│   ├── AuthForm/
│   ├── TeacherCard/
│   ├── Filters/
│   └── BookingForm/
├── pages/
│   ├── HomePage/
│   ├── TeachersPage/
│   └── FavoritesPage/
├── context/
│   ├── AuthContext.jsx
│   └── FavoritesContext.jsx
├── firebase/
│   ├── firebaseConfig.js
│   ├── auth.js
│   └── database.js
├── hooks/
│   └── useModal.js
├── styles/
│   └── global.css
└── main.jsx
```

---

## PHASES & STEPS

---

### PHASE 1 — Project Setup✅

- [ ] **1.1** Run `npm create vite@latest learnlingo -- --template react` to create the project
- [ ] **1.2** Run `cd learnlingo && npm install`
- [ ] **1.3** Install all dependencies:
  ```
  npm install react-router-dom firebase react-hook-form yup @hookform/resolvers
  ```
- [ ] **1.4** Delete all default Vite boilerplate: clear `App.jsx`, delete `App.css`, clear `index.css`
- [ ] **1.5** Create the full folder structure as shown above
- [ ] **1.6** Set up `global.css` with CSS reset and root CSS variables (colors, fonts, spacing)
- [ ] **1.7** Import `global.css` in `main.jsx`
- [ ] **1.8** Create `.env` file in root with Firebase keys (empty for now):
  ```
  VITE_FIREBASE_API_KEY=
  VITE_FIREBASE_AUTH_DOMAIN=
  VITE_FIREBASE_DATABASE_URL=
  VITE_FIREBASE_PROJECT_ID=
  VITE_FIREBASE_APP_ID=
  ```
- [ ] **1.9** Add `.env` to `.gitignore`

---

### PHASE 2 — Firebase Setup✅

- [ ] **2.1** Go to [firebase.google.com](https://firebase.google.com) → create a new project called `learnlingo`
- [ ] **2.2** In Firebase console → go to **Authentication** → Enable **Email/Password** provider
- [ ] **2.3** In Firebase console → go to **Realtime Database** → Create database → Start in **test mode**
- [ ] **2.4** In Firebase console → Project Settings → Web app → copy config keys into your `.env` file
- [ ] **2.5** Create `src/firebase/firebaseConfig.js` and initialize Firebase app using env variables
- [ ] **2.6** Create `src/firebase/auth.js` — export functions: `registerUser`, `loginUser`, `logoutUser`, `getCurrentUser`
- [ ] **2.7** Create `src/firebase/database.js` — export functions: `getTeachers`, `getUserFavorites`, `addFavorite`, `removeFavorite`
- [ ] **2.8** Upload `teachers.json` data manually into Firebase Realtime Database under a `/teachers` node

---

### PHASE 3 — Routing Setup✅

- [ ] **3.1** Wrap the app in `<BrowserRouter>` inside `main.jsx`
- [ ] **3.2** Create `App.jsx` with `<Routes>`:
  - `/` → `<HomePage />`
  - `/teachers` → `<TeachersPage />`
  - `/favorites` → `<FavoritesPage />` (protected)
  - `*` → redirect to `/`
- [ ] **3.3** Create a `PrivateRoute` component — if user is not logged in, redirect to `/` with a toast message
- [ ] **3.4** Create empty placeholder components for all 3 pages (just return `<div>Page name</div>` for now)
- [ ] **3.5** Test that navigating between routes works in the browser

---

### PHASE 4 — Auth Context✅

- [ ] **4.1** Create `src/context/AuthContext.jsx`
- [ ] **4.2** Create `AuthProvider` component that holds: `currentUser`, `isLoading` state
- [ ] **4.3** Use `onAuthStateChanged` from Firebase inside a `useEffect` to track login/logout automatically
- [ ] **4.4** Export `useAuth` custom hook for easy access: `const { currentUser } = useAuth()`
- [ ] **4.5** Wrap the entire app in `<AuthProvider>` inside `main.jsx`
- [ ] **4.6** Test: log in manually in Firebase console, check if `currentUser` appears in React DevTools

---

### PHASE 5 — Header Component✅

- [ ] **5.1** Create `src/components/Header/Header.jsx` and `Header.module.css`
- [ ] **5.2** Add logo (text or SVG) on the left
- [ ] **5.3** Add navigation links: `Home`, `Teachers` — using `<NavLink>` from React Router
- [ ] **5.4** Add auth buttons on the right:
  - If user is NOT logged in → show `Log in` and `Registration` buttons
  - If user IS logged in → show user name + `Log out` button
- [ ] **5.5** Style Header with CSS Modules matching Figma design
- [ ] **5.6** Add `Header` to `App.jsx` so it appears on all pages

---

### PHASE 6 — Modal Component (reusable)✅

- [ ] **6.1** Create `src/components/Modal/Modal.jsx` and `Modal.module.css`
- [ ] **6.2** The modal receives `onClose` and `children` as props
- [ ] **6.3** Add backdrop `<div>` behind the modal — clicking it calls `onClose`
- [ ] **6.4** Add ✕ close button inside the modal
- [ ] **6.5** Add `useEffect` that listens for `Escape` key press → calls `onClose`
- [ ] **6.6** Add `useEffect` that disables `body` scroll when modal is open (`overflow: hidden`)
- [ ] **6.7** Use `createPortal` from ReactDOM to render modal outside the main DOM tree
- [ ] **6.8** Style modal with CSS Modules (centered, backdrop overlay)

---

### PHASE 7 — Auth Forms (Register & Login)✅

- [ ] **7.1** Create `src/components/AuthForm/RegisterForm.jsx` and `RegisterForm.module.css`
- [ ] **7.2** Register form fields: `name`, `email`, `password`
- [ ] **7.3** Set up `useForm` from react-hook-form
- [ ] **7.4** Create Yup validation schema:
  - `name`: required, min 2 chars
  - `email`: required, valid email format
  - `password`: required, min 6 chars
- [ ] **7.5** Connect Yup schema to react-hook-form using `yupResolver`
- [ ] **7.6** On submit → call `registerUser` from Firebase auth → close modal on success
- [ ] **7.7** Show error message if Firebase returns an error (e.g. email already in use)
- [ ] **7.8** Create `src/components/AuthForm/LoginForm.jsx` (same structure)
- [ ] **7.9** Login form fields: `email`, `password`
- [ ] **7.10** Same Yup validation for email and password
- [ ] **7.11** On submit → call `loginUser` from Firebase auth → close modal on success
- [ ] **7.12** Show error message for wrong credentials
- [ ] **7.13** Add show/hide password toggle button (eye icon)
- [ ] **7.14** In Header: clicking `Log in` opens Modal with `<LoginForm>` inside it
- [ ] **7.15** In Header: clicking `Registration` opens Modal with `<RegisterForm>` inside it
- [ ] **7.16** Test full register → login → logout flow

---

### PHASE 8 — Home Page✅

- [ ] **8.1** Create `src/pages/HomePage/HomePage.jsx` and `HomePage.module.css`
- [ ] **8.2** Build Hero section: headline text, description, decorative image (from Figma)
- [ ] **8.3** Add "Get started" CTA button → navigates to `/teachers` using `useNavigate`
- [ ] **8.4** Build Statistics section: 3 numbers with labels (e.g. "32,000+ experienced tutors")
- [ ] **8.5** Style everything with CSS Modules matching Figma layout
- [ ] **8.6** Make sure page is responsive for desktop

---

### PHASE 9 — Fetch Teachers from Firebase✅

- [ ] **9.1** In `src/firebase/database.js` write `getTeachers(lastKey, limit)` function
  - Uses Firebase `query`, `orderByKey`, `startAfter`, `limitToFirst` for pagination
  - Returns array of teacher objects + the last key (for next page)
- [ ] **9.2** Test the function in browser console — confirm 4 teachers are returned

---

### PHASE 10 — Teacher Card Component✅

- [ ] **10.1** Create `src/components/TeacherCard/TeacherCard.jsx` and `TeacherCard.module.css`
- [ ] **10.2** Build the collapsed card view (default state) with:
  - Avatar image (round)
  - Name, surname
  - Languages, levels
  - Rating, reviews count, lessons done
  - Price per hour
  - Heart (favorite) button
  - "Read more" button
- [ ] **10.3** Add `isExpanded` state (boolean, default `false`)
- [ ] **10.4** "Read more" button sets `isExpanded = true`
- [ ] **10.5** When `isExpanded` is true, show additional info:
  - `lesson_info`, `conditions`, `experience`
  - List of student reviews (reviewer name, rating, comment)
- [ ] **10.6** Add "Book trial lesson" button (visible only when expanded)
- [ ] **10.7** Style the card with CSS Modules matching Figma

---

### PHASE 11 — Teachers Page✅

- [ ] **11.1** Create `src/pages/TeachersPage/TeachersPage.jsx` and `TeachersPage.module.css`
- [ ] **11.2** Add local state: `teachers` (array), `lastKey` (string), `isLoading` (boolean), `hasMore` (boolean)
- [ ] **11.3** On page mount → call `getTeachers(null, 4)` → store result in state
- [ ] **11.4** Render list of `<TeacherCard />` components
- [ ] **11.5** Add "Load more" button at the bottom
- [ ] **11.6** On "Load more" click → call `getTeachers(lastKey, 4)` → append new teachers to the list
- [ ] **11.7** Hide "Load more" button when `hasMore` is `false`
- [ ] **11.8** Show loading spinner while fetching

---

### PHASE 12 — Favorites Context & Logic✅

- [ ] **12.1** Create `src/context/FavoritesContext.jsx`
- [ ] **12.2** `FavoritesProvider` holds: `favorites` (array of teacher objects)
- [ ] **12.3** On auth state change → if user is logged in, fetch their favorites from Firebase (`getUserFavorites(userId)`)
- [ ] **12.4** In `database.js` write `getUserFavorites(userId)` — reads from `/users/{userId}/favorites`
- [ ] **12.5** In `database.js` write `addFavorite(userId, teacher)` — writes teacher to `/users/{userId}/favorites/{teacherId}`
- [ ] **12.6** In `database.js` write `removeFavorite(userId, teacherId)` — deletes from Firebase
- [ ] **12.7** Export `useFavorites` custom hook
- [ ] **12.8** Wrap app in `<FavoritesProvider>` inside `main.jsx`
- [ ] **12.9** Wire toggleFavorite to call addFavorite/removeFavorite from Firebase

---

### PHASE 13 — Heart Button Logic✅

- [ ] **13.1** In `TeacherCard`, get `currentUser` from `useAuth()` and `favorites` from `useFavorites()`
- [ ] **13.2** Determine if this teacher is already favorited: check if teacher id exists in `favorites` array
- [ ] **13.3** If teacher is favorited → show filled heart (yellow/red color)
- [ ] **13.4** If teacher is NOT favorited → show outline heart
- [ ] **13.5** On heart click:
  - If user is NOT logged in → show a toast/modal: "Please log in to add to favorites"
  - If user IS logged in AND teacher is NOT favorited → call `addFavorite` → update context
  - If user IS logged in AND teacher IS favorited → call `removeFavorite` → update context
- [ ] **13.6** Test: add to favorites → refresh page → heart should still be filled

---

### PHASE 14 — Favorites Page✅

- [ ] **14.1** Create `src/pages/FavoritesPage/FavoritesPage.jsx` and `FavoritesPage.module.css`
- [ ] **14.2** Wrap `/favorites` route in `<PrivateRoute>` (redirect to `/` if not logged in)
- [ ] **14.3** Get `favorites` from `useFavorites()` context
- [ ] **14.4** Render the list of favorited teachers using `<TeacherCard />` components
- [ ] **14.5** If `favorites` is empty → show a message: "You have no favorite teachers yet"
- [ ] **14.6** Style page the same as Teachers page
- [ ] **14.7** Add Favorites navigation:
      "Add a 'Favorites' link in the Header/navbar that navigates to /favorites. The link should be visible only when the user is logged in. Verify that the /favorites route is correctly registered in the router and wrapped in <PrivateRoute>. Test the full flow: log in → click Favorites in navbar → FavoritesPage loads → saved teachers appear with filled hearts."

---

### PHASE 15 — Filters✅

- [ ] **15.1** Create `src/components/Filters/Filters.jsx` and `Filters.module.css`
- [ ] **15.2** Add 3 dropdowns (select inputs):
  - Language (unique languages from teachers data)
  - Student level (unique levels from teachers data)
  - Price per hour (options: 10, 20, 30, 40... or "All")
- [ ] **15.3** Add filter state to `TeachersPage`: `{ language: '', level: '', price: '' }`
- [ ] **15.4** When a filter changes → re-fetch teachers from Firebase with filter applied
  - OR: fetch all teachers and filter client-side (simpler option)
- [ ] **15.5** Connect `Filters` component to Teachers page — pass filter state and onChange handler as props
- [ ] **15.6** Add same `Filters` component to Favorites page
- [ ] **15.7** On Favorites page, filters work on the already-loaded `favorites` array (client-side filtering)
- [ ] **15.8** Test all 3 filters work correctly, including combinations
- [ ] **15.9** Style the Filters component in Filters.module.css to match the overall app design.
- [ ] **15.9.1** Add a Show 'All' button to the Filters component. The button should:
      -Only appear when at least one filter is active (language, level, or price is selected)
      -When clicked, reset all three dropdowns back to 'All' (empty values)
      -Be placed next to the dropdowns, aligned with them
      -Use the exact same styling and colors as the 'Load More' button same background, same font, same border radius, same padding.
- [ ] **15.9.2** Add custom dropdown component. Create a reusable src/components/CustomSelect/CustomSelect.jsx and CustomSelect.module.css.

---

### PHASE 16 — Book Trial Lesson Modal✅

- [ ] **16.1** Create `src/components/BookingForm/BookingForm.jsx` and `BookingForm.module.css`
- [ ] **16.2** Form fields (all required):
  - Reason for learning (radio buttons: career, kids, travel, exams, other)
  - Full name (text input)
  - Email (text input)
  - Phone number (text input)
- [ ] **16.3** Set up `useForm` with Yup validation:
  - `reason`: required
  - `fullName`: required, min 2 chars
  - `email`: required, valid email
  - `phone`: required, valid phone format
- [ ] **16.4** On submit → show success message → close modal
- [ ] **16.5** In `TeacherCard`: "Book trial lesson" button opens `<Modal>` with `<BookingForm>` inside
- [ ] **16.6** Pass teacher's name into the modal title: "Book trial lesson with {name}"
- [ ] **16.7** Style form with CSS Modules matching Figma
- [ ] **16.8** Save booking data to Firebase when the BookingForm is submitted:
      In database.ts add a saveBooking(bookingData) function that uses push(ref(db, 'bookings'), bookingData) to save to Firebase
      The booking object should contain:
      userId — from auth.currentUser?.uid
      teacherId — passed as prop to BookingForm
      reason, fullName, email, phone — from form data
      createdAt — using serverTimestamp()
      Pass teacherId as a prop from TeacherCard to BookingForm
      Update Firebase rules to allow authenticated users to write to bookings/:
      json'bookings': {
      '.read': 'auth != null',
      '.write': 'auth != null'
      }
      On successful save → show toast success message → close modal
- [ ] **16.9** Add a mobile drawer implementation for the BookingForm. On mobile screens (below 768px) instead of a centered popup modal, the booking form should slide up from the bottom of the screen as a drawer.

---

### PHASE 17 — Final Polish✅

- [ ] **17.1** Go through all pages — check for any console errors and fix them
- [ ] **17.2** Check all modals: ✕ button, backdrop click, and Esc key all close them
- [ ] **17.3** Verify private route works: visiting `/favorites` while logged out redirects correctly
- [ ] **17.4** Check favorites persist after page refresh (Firebase read on auth state change)
- [ ] **17.5** Verify "Load more" pagination works correctly
- [ ] **17.6** Check all form validations show correct error messages
- [ ] **17.7** Remove all `console.log` statements from code
- [ ] **17.8** Remove all code comments
- [ ] **17.9** Check HTML is semantic (use `<header>`, `<main>`, `<section>`, `<ul>`, `<li>`, etc.)
- [ ] **17.9.1**
      // ‼️‼️TODO Phase 17 — Email Notifications
      // Booking data is already saved to Firebase (completed).
      // Email notification to the client is NOT yet implemented.
      // Two options for future implementation:
      // Option 1: EmailJS — free, frontend only, no backend needed (easiest)
      // Option 2: Firebase Cloud Functions — triggers on booking save, more professional
      // Choose one approach and implement before final production release.

---

### PHASE 18 — README & Deployment

- [ ] **18.1** Create `README.md` in root with:
  - Project description
  - Tech stack list
  - Link to Figma design
  - Link to live demo
  - How to run locally (`npm install` + `npm run dev`)
- [ ] **18.2** Push project to GitHub repository
- [ ] **18.3** Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
- [ ] **18.4** Set build command: `npm run build`, publish directory: `dist`
- [ ] **18.5** Add all `.env` variables in Netlify → Site settings → Environment variables
- [ ] **18.6** Deploy and test the live URL
- [ ] **18.7** Add live URL to `README.md` and push

---

## QUICK REFERENCE — Key npm packages

| Package               | Purpose                         |
| --------------------- | ------------------------------- |
| `react-router-dom`    | Routing (pages, private routes) |
| `firebase`            | Auth + Realtime Database        |
| `react-hook-form`     | Form state management           |
| `yup`                 | Form validation schemas         |
| `@hookform/resolvers` | Connect Yup to react-hook-form  |

---

## TOTAL: 18 Phases · ~90 small steps
