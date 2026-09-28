# Schoolday

A mobile-first school management proof of concept using dummy student data.

## Run

```sh
npm install
npm run dev
```

## Screens

- Login: any username/password works; choose Principal, Teacher, or Student from the role dropdown.
- Role home: each role receives a tailored dashboard and can sign out to switch roles.
- Home: student card, attendance summary, homework, next class, notices.
- Timetable: switch between five weekdays.
- Homework: view instructions, mark complete, and restore to pending.
- Attendance: sample monthly calendar and summary.
- Fees: fee breakdown, simulated payment, and demo receipt.
- Notices, profile, and school office details.

## Components and libraries

React with Next.js-compatible Vinext; the included shadcn/ui components use Radix UI. Buttons, cards, tabs, dialogs, avatars, badges, and progress bars are composed from those components. Lucide supplies the flat SVG icons. Tailwind and a shared stylesheet provide a navy, blue, and white theme.

Product code lives in `app/page.tsx` and `app/globals.css`. `IconTile`, `Section`, and `ListRow` are reused across screens. Dummy records are defined near the top of the page.

All interactions are local to the current browser session and reset on refresh. This prototype has no real payments, authentication, backend, or student records.

## Validation

```sh
npx tsc --noEmit
npm run build
```
