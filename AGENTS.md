# Repository guidance

- Use Next.js App Router, TypeScript and Tailwind utilities. Keep server components as the default.
- Never expose `DATABASE_URL` to the browser. Keep it in `.env.local` and use it only from server code.
- Treat all seed and UI values as demonstration data; do not introduce customer, partner, or revenue data without an approved source.
- Preserve the design system: navy `#082747` navigation, pale-blue page ground, white rounded cards, calm executive hierarchy.
- Use Modern Minimal and Bento Grid as the visual direction for every portal page: restrained color, generous spacing, consistent rounded cards, clear information hierarchy, and dense data organized into calm modular panels.
- Key Partners means dealer, reseller, and system integrator; it must not be renamed to vendors.
- Every data mutation must enforce role permissions in RLS and/or a server action.
- Before a handoff run `npm run lint` and `npm run build`.
