

## Plan: Fix Typography — Syne + DM Sans

The issue is clear: Google Fonts (Syne and DM Sans) are **not imported anywhere**, and the body uses `Inter` as the font family. No component references Syne or DM Sans either.

### Changes Required

**1. `index.html` — Add Google Fonts import in `<head>`**
Add this line before `</head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
```

**2. `src/index.css` — Replace body font-family and add heading rule**

- Line 138: Change `font-family: Inter, system-ui, ...` → `font-family: 'DM Sans', sans-serif;`
- Add a global heading rule in `@layer base`:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}
```
- Update `.hero-title` to explicitly use `font-family: 'Syne', sans-serif;` and `letter-spacing: -0.03em;`
- Update `.btn` to use `font-family: 'DM Sans', sans-serif;`

### What does NOT change
- No component files are modified — no inline font overrides exist there
- Compliance checker logic, URLs, iframe system all untouched
- Only CSS typography declarations are affected

### Technical detail
The two files touched are `index.html` (3 lines added to `<head>`) and `src/index.css` (body font swap + heading rule addition + hero-title update).

