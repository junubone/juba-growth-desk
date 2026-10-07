# Juba Growth Desk website plan

## Scope and implementation

Build a responsive, accessible, single-page public marketing website for Juba Growth Desk, using the approved brief and supplied business plan. The site explains its hospitality-first audience, the inquiry-generation offer, service packages, process, realistic proof boundaries, test-pricing status and contact path. It must not invent contact details, customers, testimonials, metrics, compliance claims or sales guarantees; the owner has supplied `junubone@gmail.com` as the public support email. Prices from the business plan are hypotheses, not public rate-card facts; use a scoped-proposal message instead.

Use a small, dependency-light static site: semantic HTML with useful content in the initial response; CSS for responsive layouts; minimal JavaScript for navigation and an honest, configurable inquiry experience. No account system, database, paid-media API or lead-data collection is required. The form opens an unsent email draft to the supplied support address and must not claim that a request was delivered. Keep the visible `mailto:` address in `public/index.html` consistent with the form destination in `public/site.js`, and document both locations in the README. Provide the homepage as `/` and declare the route in `public/manus-routes.json`.

For Manus preview, use a small Node.js HTTP server bound to `0.0.0.0:3000`. The dependency-free build script copies the entire `public/` tree into `dist/`; local image assets keep the GitHub/Vercel deployment independent of Manus storage. `vercel.json` specifies `npm run build` and `dist` as the static output. Use no framework or external runtime dependency unless the initialized project proves otherwise. Set search metadata in the HTML, but omit canonical and absolute social-preview URLs until a real public origin is configured. Do not add a sitemap with guessed addresses.

### Project structure

- `public/index.html` — single-page marketing copy, semantic sections and SEO metadata.
- `public/site.css` — visual system, responsive layouts, reduced-motion and focus states.
- `public/site.js` — mobile navigation and contact-form state; no false submission success.
- `public/assets/` — repository-local hero and supporting WebP images plus the site icon.
- `public/manus-routes.json` — declared public route set.
- `server.mjs` — local development preview server on the configured port.
- `scripts/build.mjs` — dependency-free static build into `dist/`.
- `package.json` — scripts only; no application dependencies unless needed.
- `app.config.ts` — quoted HTTPS `logoUrl` literal for the uploaded brand icon, as required for a project checkpoint.
- `plan.md` / `TODO.md` — approved implementation direction and complete product outcomes.
- `README.md` / `vercel.json` — portable build and future GitHub/Vercel handoff instructions and settings.

## Design direction

**Design movement:** contemporary East African hospitality editorial, informed by Swiss modernist grid discipline and tactile boutique-hotel print collateral. Keep it specific through material, light and operational detail rather than stock “African” motifs or invented landmarks.

**Core principles:** candid business value; warm, human hospitality; mobile-first clarity; visible evidence instead of hype.

**Color philosophy:** creamy paper (`#F5F1E8`) and warm chalk for breathing room; deep signal green (`#123F38`) as the signature color for dependable direction and calls to action; persimmon (`#E17C50`) as a small energetic cue for inquiry markers; near-black text for legibility. Avoid using color alone to indicate state.

**Layout paradigm:** asymmetrical editorial hero with copy on the left and one original, venue-context image on the right; a linear “discover → reply → learn” lead path across the page; alternating long-form copy and compact service blocks rather than a uniform card grid. Let the contact section feel like a clear final step.

**Signature elements:** a custom signal-thread motif (three rising dots connected by a fine line) linking visibility to inquiry; fine inset rules and a small persimmon “next step” marker; editorial image crops with paper-like captions.

**Interaction philosophy:** make the next action obvious, preserve readable tap targets, keep navigation short, and give clear validation/error feedback. Do not use fake counters, simulated analytics or misleading success messages.

**Animation:** restrained 160–220 ms opacity/translate transitions for small reveals and menu state only; no parallax, autoplay, or decorative motion required to understand the site; honor `prefers-reduced-motion`.

**Typography:** DM Sans (or a close system sans fallback) for body, controls and labels; DM Serif Display (or a readable serif fallback) for a small number of large editorial headlines. Use a comfortable body size, short line lengths and a clear heading hierarchy.

**Brand essence:** “Juba hospitality businesses get a clearer path from social visibility to trackable inquiries.” Personality: practical, warm, candid.

**Brand voice:** plain, specific and commercially honest. Headlines describe an outcome without guaranteeing it; CTAs invite a conversation, not an instant miracle. Example lines: “Make it easier to find you, ask, and book.” “Every campaign has one clear next step—and a way to learn from the response.”

**Wordmark and logo:** typeset “Juba Growth Desk” with a custom three-dot signal-thread symbol; the symbol must remain legible at favicon size and must not imitate a government seal or hotel mark.

**Signature brand color:** deep signal green (`#123F38`).

## Content boundaries

- Use the chosen Juba hospitality segment: hotels, guesthouses, restaurants and event venues.
- Explain the profile/inquiry audit, launch sprint, monthly content and inquiry tracking, and optional supplier capability profile.
- Tell readers outcomes vary, no bookings/sales are guaranteed, and the service is not legal, tax, licensing or tender-compliance advice.
- No fabricated proof. Show the operating method and state that case studies are added only with client permission and verified data.
- Do not show unvalidated business-plan price ranges as standard rates.
- Show `junubone@gmail.com` as the supplied public support email and route prepared inquiries to it; do not invent a WhatsApp number.
