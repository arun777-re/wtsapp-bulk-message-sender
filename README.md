![Node](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Next](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)



# WhatsApp Bulk Messaging — Frontend (Next.js + TypeScript)

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white) ![Next](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs\&logoColor=white)

> A clean, fast, and responsive frontend for automating WhatsApp messages to multiple contacts via CSV import. Built with Next.js (App Router), TypeScript, and TailwindCSS — production-ready and easy to deploy.

---

## Table of contents

* [Highlights](#highlights)
* [Live demo / Preview](#live-demo--preview)
* [Tech stack](#tech-stack)
* [Features](#features)
* [Repository structure](#repository-structure)
* [API contract (backend endpoints)](#api-contract-backend-endpoints)
* [CSV format](#csv-format)
* [Environment variables](#environment-variables)
* [Getting started (local)](#getting-started-local)
* [UX & quality notes](#ux--quality-notes)
* [Recommended future enhancements](#recommended-future-enhancements)
* [Testing & validation](#testing--validation)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)



## Highlights

* Fast CSV-driven bulk messaging UI — no manual saving of phone numbers
* QR-based WhatsApp login with auto-polling and robust cleanup
* Single and bulk send flows with loading states & validations
* Mobile-first responsive dashboard UI
* Minimal dependencies, easy to host (Vercel / Netlify)



## Tech stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** TailwindCSS
* **State / Logic:** Custom React hooks
* **Icons:** react-icons
* **Images:** next/image



## Features

* CSV upload + preview
* WhatsApp QR popup with auto-polling until authenticated
* Send single message (manual) or bulk (CSV) with one click
* Toast notifications for success / error flows
* Loading spinners and form-level validations
* Responsive layout (desktop + mobile)



## Repository structure

src/
├─ components/
│  ├─ BulkMessage/
│  ├─ WhatsAppQR/
│  ├─ Header/
│  ├─ Main/
│  ├─ SingleMsgForm/
│  ├─ Spinner/
│  └─ UploadForm/
│
├─ hooks/
│  └─ useCSVHook.ts
│
├─ utils/
│  └─ api.ts
│
├─ constants/
│  └─ routes.ts
│
└─ app/
   ├─ page.tsx
   ├─ send-msg/
   └─ globals.css




## API contract (backend endpoints)

> All routes are referenced from `constants/routes.ts` as `ROUTES.API`.

* `POST /api/csv/upload-csv` — Accepts CSV file, returns parsed rows and upload id.

  * Request: `multipart/form-data` with `file` field.
  * Response: `{ success: boolean, data: { rows: Array<{phone,name?,message?}>, uploadId? } }`

* `GET /api/auth/qr-code` — Starts/returns QR for WhatsApp login and session status.

  * Response: `{ qr: string (base64/svg/url), status: 'pending' | 'authenticated' | 'expired' }`

* `POST /api/message/send-single` — Send a single message.

  * Body: `{ phone: string, message: string }`
  * Response: `{ success: boolean, messageId?: string, error?: string }`

* `POST /api/message/send-bulk` — Send bulk messages.

  * Body: `{ message:string, Array<{ phone: string }>, defaultMessage?: string }`
  * Response: `{ success: boolean, summary: { sent: number, failed: number, errors?: any[] } }`

> **Note:** Keep backend responses consistent and use clear HTTP status codes. Frontend expects JSON with `success` + `data` or `error` fields.

---

## CSV format

Minimum requirement: **phone** column. Optional columns: **tile**, **category**, **website**.

Example (UTF-8, no BOM):

```
phone,title,category,website
919876543210,Rahul,"Hello Rahul, thanks for connecting!"
919812345678,Anita,
```

Validation rules enforced by frontend:

* Phone numbers must be E.164-like (country code + number) or a sanitized numeric string.
* Empty message field will use `defaultMessage` (if provided) or the `message` typed in the UI.



## Environment variables

Create a `.env.local` file at project root with:

```
NEXT_PUBLIC_BASE_URL=https://your-backend-domain.com
```

> `NEXT_PUBLIC_` prefix is mandatory for access in the browser and for Next.js production builds.



## Getting started (local)

1. Clone

```bash
git clone https://github.com/arun777-re/wtsapp-bulk-message-sender.git
cd frontend
```

2. Install

```bash
npm install
# or
pnpm install
```

3. Run dev

```bash
npm run dev
```

Open `http://localhost:3000`



## UX & quality notes

* QR auto-polling is implemented using `setInterval` stored in a `useRef()` and cleared during cleanup (`useEffect` cleanup) to avoid render loops.
* CSV handling is abstracted inside `useCSVHook.ts` — responsibilities: parse, validate, preview, upload.
* Toast notifications (e.g., `react-hot-toast`) show step-by-step statuses: uploading, parsing, queued, sent, failed with retry options.
* Forms have inline validations (required fields, phone sanitization) and friendly error messages.
* Minimal external dependencies to keep bundle size low and performance high.



## Recommended improvements (roadmap)

* Message templates with placeholders (e.g. `{{name}}`) and preview
* Upload history with retry and status tracking (sent / delivered / failed)
* Dark mode and theming
* Role-based UI (admin / operator)
* Add unit / integration tests (Jest + React Testing Library)
* Accessibility audit & fixes (WCAG checklist)



## Testing & Validation

* Manually test with CSVs that contain edge-cases: missing columns, multiline fields, special characters, and large files (≥5k rows)
* Test QR lifecycle: pending → authenticate → expired
* Simulate partial backend failures during bulk send and verify retry UI



## Deployment

* Recommended: Vercel. Ensure `NEXT_PUBLIC_BASE_URL` points to production backend.
* For Netlify or other platforms, build command is the default `next build` then `next start` (production) or use Vercel adapter.



## Contributing

1. Fork the repo
2. Create branch: `feature/your-feature`
3. Commit changes and push
4. Open PR with description and screenshots

Please follow the code style (TypeScript strict mode, ESLint + Prettier) and include tests where possible.



## License

MIT © Arun



### Contact

If you want me to convert this into a `README.md` file in the repo, or make the UI copy/pixel-perfect, or generate components from design — tell me which one and I will prepare the next step.
