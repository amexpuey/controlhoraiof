

## Plan: Compliance Checker — Dark Header Only, Light Body

### Summary

Keep the hero/urgency bar dark (`#0A1628`). Switch everything below (verificador form, results, calculator, FAQs, final CTA, footer) to the light theme (white backgrounds, dark text, light borders) matching the provided design system.

---

### What changes

**1. `src/index.css`** — Reduce `.compliance-theme` scope

- Remove the blanket `.compliance-theme { background: #07111F; color: #ffffff; }` rule that turns the whole page dark.
- Replace with `.compliance-theme { background: var(--white); color: var(--text); }` so the page base is light.
- Keep `.compliance-theme .urgency-bar` and `.compliance-theme .hero-shell` dark (already dark via `#07111F` background).
- Remove `.compliance-theme h1, h2, h3, h4 { color: #ffffff !important; }` blanket override.
- Keep dark overrides only for elements inside `.hero-shell` and `.urgency-bar`.
- Remove dark overrides for `.compliance-theme .glass`, `.compliance-theme .pill`, `.compliance-theme .btn-ghost`, `.compliance-theme .input`, `.compliance-theme .progress`, `.compliance-theme .badge` — they will now inherit light styles.
- Remove dark overrides for `.compliance-theme .result`, `.compliance-theme .calculator`, `.compliance-theme .faq` — they will use the light `.glass` / white card styling.
- Remove dark overrides for `.compliance-theme .panel`, `.compliance-theme .severity`, `.compliance-theme .score`, `.compliance-theme .tab`, `.compliance-theme .stat-card`, `.compliance-theme .step`, `.compliance-theme .steps`.
- Keep `.compliance-theme .stats-grid` and `.compliance-theme .stat-card` but restyle to light: white bg, `var(--border)` border, dark text number, `var(--text-secondary)` label.
- Keep `.compliance-theme .steps` / `.compliance-theme .step` but restyle to light card style (white bg, border, dark text).

**2. `src/components/compliance/HeroSection.tsx`** — Wrap hero in dark container

- Wrap the urgency bar + hero content in a `<div className="hero">` (uses the existing `.hero` class which is `background: var(--dark); color: white`).
- Remove inline `style={{ color: '#ffffff' }}` from elements since they're inside `.hero` which handles white text.
- Keep the teal tag, H1, subtitle, CTA button, and social proof as-is but let them inherit from `.hero`.

**3. `src/components/compliance/HowItWorksSection.tsx`** — Switch to light styling

- Remove `style={{ color: '#ffffff' }}` from stat numbers; use `style={{ color: 'var(--text)' }}` instead.
- Remove `style={{ color: '#ffffff' }}` from "Como funciona" heading; use default dark text.
- Change `.hero-sub` to a regular `style={{ color: 'var(--text-secondary)' }}`.
- Change step icon/text references from white/muted to dark equivalents (`var(--text)`, `var(--text-secondary)`).

**4. `src/components/compliance/ComplianceQuestionForm.tsx`** — Switch to light styling

- Replace all `style={{ color: '#ffffff' }}` with `style={{ color: 'var(--text)' }}`.
- Replace all `style={{ color: 'var(--muted-text)' }}` with `style={{ color: 'var(--text-secondary)' }}`.
- Remove `style={{ color: 'var(--teal)' }}` on icon; use `style={{ color: 'var(--green)' }}`.
- Replace `style={{ background: 'var(--teal-glow)', border: ... }}` with `style={{ background: 'var(--green-bg)', border: '1px solid var(--green-light)' }}`.

**5. `src/components/compliance/ComplianceResults.tsx`** — Switch to light styling

- Replace all `style={{ color: '#ffffff' }}` with `style={{ color: 'var(--text)' }}`.
- Replace all `style={{ color: 'var(--muted-text)' }}` with `style={{ color: 'var(--text-secondary)' }}`.
- Update mobile sticky CTA gradient from dark to light: `linear-gradient(180deg, transparent, rgba(255,255,255,.95))`.
- Update sticky CTA button text color if needed.

**6. `src/components/compliance/FinalCTASection.tsx`** — Switch to light CTA style

- Replace `glass card-lg` with `cta-box` class (or equivalent light card).
- Replace `style={{ color: '#ffffff' }}` on heading with `style={{ color: 'var(--text)' }}`.
- Replace teal-glow icon background with `var(--green-bg)`.
- Replace `hero-sub` with `style={{ color: 'var(--text-secondary)' }}`.

**7. `src/pages/ComplianceCheckerPage.tsx`** — Update FAQ and footer to light

- Replace `glass card-lg` FAQ wrapper with a light card (white bg, border).
- Replace `style={{ color: '#ffffff' }}` on FAQ heading with dark text.
- Replace `style={{ color: 'var(--teal)' }}` with `style={{ color: 'var(--green)' }}`.
- Replace `style={{ color: 'var(--muted-text)' }}` on accordion content with `var(--text-secondary)`.
- Replace `glass` accordion items with light card styles.
- Update `.compliance-footer` to light style or keep dark as accent strip.

**8. `src/components/blog/compliance-checker/ProgressBar.tsx`** — Switch to light

- Replace dark `.glass` references with light card colors.
- Change text colors from `text-ink-700` / `text-ink-900` / `text-ink-600` to use `var(--text)` and `var(--text-secondary)`.
- Change progress bar gradient from `from-teal to-lime` to `var(--green)`.

---

### What does NOT change

- Compliance logic (questions, scoring, calculator math)
- `complianceData.ts`
- Route structure, App.tsx
- Other pages (dashboard, blog, templates)
- The hero/urgency bar dark appearance

---

### Technical notes

- The `.compliance-theme` class on the page wrapper stays, but its CSS rules will be drastically reduced to only scope the hero dark area.
- The light styling will mostly inherit from the global `:root` tokens already defined, so we remove dark overrides rather than adding new light ones.
- The `SanctionCalculatorTabs` and `SanctionForm` components reference `var(--text-strong)`, `var(--text)`, `var(--brand)` which are already light-compatible, so they need no changes.

