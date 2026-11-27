# PetiPas v1.1

Offline-first, bilingual (EN/FR) positive-parenting PWA.

    npm install
    npm run dev       # local development
    npm run build     # production build (generates the offline service worker)
    npm run preview   # test the production build locally

## v1.1 accessibility changes
- Screen-reader labels on all icon-only buttons (back, settings), bilingual
- Text size setting (Normal / Large / Extra large) in Settings
- Colour contrast fixed to WCAG AA (buttons, labels, status text, borders)
- Page language (lang) switches with English/French
- Milestones are real checkboxes (keyboard + screen-reader operable)
- Visible keyboard focus, 44px minimum touch targets, reduced-motion support
- Online/offline indicator now updates live
- Dark mode fix on the Home "tip" card
