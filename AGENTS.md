# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Grids is a Vue 3 + TypeScript link-in-bio / portfolio builder. The frontend is at the repo root; Firebase Cloud Functions live in `functions/`.

### Quick reference

| Task | Command | Notes |
|---|---|---|
| Dev server | `npm run dev` | Serves at `http://localhost:5173` |
| Lint | `npm run lint` | Uses `--max-warnings 0`; pre-existing warnings cause exit code 1 |
| Tests | `npm run test:run` | Vitest, 142 tests |
| Type-check | `npm run type-check` | `vue-tsc --build --force` |
| Build | `npm run build-only` | Needs `VITE_FIREBASE_*` env vars (stubs are fine) |
| Functions type-check | `cd functions && npm run build` | Compiles TS to `functions/lib/` |

### Non-obvious caveats

- **Lint is noisy**: The repo has ~336 pre-existing lint issues (mostly `@typescript-eslint/no-explicit-any` warnings in `functions/src/index.ts` and various frontend files). CI uses `--max-warnings 0`, so `npm run lint` exits non-zero. This is a known state of the repo — do not attempt to fix all warnings as part of an unrelated change.
- **Firebase config is hardcoded**: `src/firebase.ts` contains hardcoded Firebase config values (not pulled from env vars). The `.env` file holds `VITE_FIREBASE_*` vars but they are only used by the build; the runtime Firebase SDK uses the values in `src/firebase.ts`.
- **Build needs env stubs**: `npm run build-only` fails if `VITE_FIREBASE_*` vars are missing. Use any stub values (CI does this too — see `.github/workflows/ci.yml` build job).
- **Functions `engines.node` says 20**: `functions/package.json` declares `"node": "20"`, but the Functions install and build fine on Node 22 (same as CI). The warning is harmless.
- **No Firebase emulators in cloud**: Firebase emulators are not set up in this environment. The frontend dev server runs standalone and connects to production Firebase by default. Full end-to-end testing with Firestore/Auth requires either emulators or a real Firebase project.
