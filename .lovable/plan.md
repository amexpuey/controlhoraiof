

## Plan: Full Visual Redesign — INWOUT Dark Theme + Conversion Optimization

This is a comprehensive redesign of the Compliance Checker page to match INWOUT's dark, professional brand identity and optimize for conversion. The compliance logic (questions, scoring algorithm) stays untouched.

---

### What changes and why

The current design uses a light glassmorphic aesthetic with orange/teal gradients on white. The target is a dark, authoritative legal look: navy-black backgrounds (`#07111F`), dark cards (`#0D1E35`), teal accents (`#0FB89F`), and professional typography (Syne headings, DM Sans body). The copy is also updated to be legally accurate (obligatory since May 2019, not 2026) and conversion-focused.

---

### Files to modify

**1. `src/index.css`** — Replace CSS custom properties and all compliance-specific styles

- Change `:root` design tokens to INWOUT dark palette:
  - `--ink: #07111F`, `--ink2: #0D1E35`, `--teal: #0FB89F`, `--teal2: #0DA88F`
  - `--teal-glow: rgba(15,184,159,.18)`, `--muted: rgba(255,255,255,.50)`, `--muted2: rgba(255,255,255,.10)`
  - `--amber: #d97706`
- Change `html` background from the orange-teal gradient to `#07111F`
- Change `body` color from `var(--text-strong)` to `#ffffff`
- Update `.glass` to use `background: #0D1E35` with `border: 1px solid rgba(255,255,255,.10)` and `border-radius: 16px` (no backdrop-filter needed on dark bg)
- Update `.btn-primary`: background `#0FB89F`, color `#07111F`, border-radius `12px`, hover with teal glow shadow
- Update `.btn-ghost`: dark-themed with `rgba(255,255,255,.10)` background
- Update `.hero-shell`, `.hero-url`, `.step`, `.result`, `.panel`, `.score`, `.pill`, `.severity`, `.tab`, `.badge` — all to dark card style (`#0D1E35` bg, `rgba(255,255,255,.10)` border, white text)
- Update `.hero-sub` color to `rgba(255,255,255,.50)`
- Add `.urgency-bar` style: `background: #d97706`, white text, 13px bold, centered, full-width
- Add `.stats-grid` style: grid of stat cards with large teal/white numbers
- Remove any white/light backgrounds, orange/yellow gradients

**2. `src/components/compliance/HeroSection.tsx`** — Rewrite hero content

- Add urgency bar at the top: "La Inspección de Trabajo impuso 20,2M€ en sanciones en 2024. ¿Sabes cuánto arriesga tu empresa?"
- Add small teal tag above title: "RD 8/2019 · Obligatorio para todas las empresas"
- H1: "¿Tu empresa cumple con el registro horario?"
- Subtitle: "Responde 5 preguntas y descubre tu nivel de riesgo de sanción. Resultado inmediato. Sin registro."
- CTA button: "Calcular mi riesgo ahora →" with subtexto "Resultado en < 1 minuto · Online · Sin datos personales"
- Social proof: "Más de 3.000 empresas han calculado su riesgo este año"
- Remove the Safari browser bar mockup (`.hero-url` div)
- Remove "Verificador de Cumplimiento Normativo" title, badges about "Gratis y sin registros" / "Evita multas"

**3. `src/components/compliance/HowItWorksSection.tsx`** — Update steps content + add stats section

- Update 3 steps text:
  - Paso 1: "5 preguntas sobre tu sistema actual de registro horario"
  - Paso 2: "Evaluamos tu riesgo real según normativa española vigente"
  - Paso 3: "Sabrás exactamente qué riesgo tienes y cómo solucionarlo"
- Add stats section below steps with 4 cards:
  - **20,2M€** — Sanciones ITSS en 2024
  - **12.000€** — Condena judicial media por trabajador
  - **90%** — Casos ganados por el trabajador sin registro
  - **1.869** — Infracciones de control horario en 2024
- Style: dark cards (`#0D1E35`), large number in teal/white, description in muted white

**4. `src/components/compliance/ComplianceResults.tsx`** — Update result CTAs and colors

- High risk result: CTA text → "Soluciónalo con INWOUT — Prueba gratis 14 días →", link to `https://app.inwout.com`
- Supporting text: "INWOUT implementa registro horario válido según RD 8/2019 en menos de 1 hora."
- Low risk / compliant result: CTA → "Mantén el cumplimiento automático con INWOUT"
- Update color references from CSS vars to dark theme compatible values (white text on dark bg)
- Remove animated bounce/pulse on icons (too playful for authoritative tone)
- Update mobile sticky CTA: dark bg, teal button, text "Soluciónalo con INWOUT"

**5. `src/components/compliance/FinalCTASection.tsx`** — Update copy and style

- Title: "Haz la prueba en 1 minuto y evita sanciones de hasta 7.500€ por infracción"
- Subtitle: "No arriesgues tu empresa. Verifica tu cumplimiento según el RD 8/2019."
- Button: "Comenzar verificación gratuita →"
- Dark card style, teal accents

**6. `src/components/compliance/ComplianceQuestionForm.tsx`** — Visual updates only

- Update header text colors to white (`#ffffff`) instead of `var(--ink-900)`
- Update form labels and text to white/muted white
- Question counter text to muted white
- No changes to form logic, question flow, or answer handling

**7. `src/pages/ComplianceCheckerPage.tsx`** — Add urgency bar, update FAQ colors

- FAQ text colors: white headings, muted white body text
- FAQ cards: dark style consistent with new theme
- Remove any light-colored inline styles

**8. `src/components/Footer.tsx`** — Update footer for compliance page context

- The footer is already hidden on `/compliance-checker` route, so minimal changes needed
- But when embedded, the page itself should show a minimal footer: "Verificador creado por INWOUT · Software de control horario para empresas españolas" with link to `www.inwout.com`

---

### What does NOT change

- `src/components/compliance/complianceData.ts` — All questions, sanctions, risk levels, scoring logic untouched
- `src/components/compliance/SanctionCalculator.tsx` — Calculator logic untouched (visual style inherits from CSS)
- The iframe embedding system and URL structure
- `netlify.toml` headers (CSP, iframe-resizer)
- The route configuration in `App.tsx`

---

### Technical notes

- The CSS changes affect the entire app's `:root` variables. Since this app is primarily the compliance checker embedded via iframe, this is acceptable. However, other routes (dashboard, blog, etc.) will also inherit these dark styles. If that's a concern, we can scope the dark styles to a `.compliance-page` wrapper class instead. **Recommendation**: scope all dark-theme changes under a `.compliance-theme` class applied only to the ComplianceCheckerPage, leaving other routes untouched.
- The urgency bar is a new component rendered at the top of the page, not a fixed/sticky element (to avoid iframe complications).
- All stats data (20.2M€, 12.000€, 90%, 1.869) are hardcoded in the component since they're 2024 ITSS figures.

