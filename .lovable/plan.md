

## Millores del calendari de vacances

Després de revisar l'eina, he identificat aquestes millores clau:

### 1. Responsivitat mòbil
- El layout actual és `grid 280px + 1fr`, no funciona en mòbil
- Canviar a layout vertical en pantalles petites (sidebar a dalt, calendari a sota)
- Fer el panel d'empleats col·lapsable en mòbil

### 2. Selecció per rang de dies (drag o shift+click)
- Ara cal fer clic dia a dia, poc pràctic per posar 2 setmanes de vacances
- Afegir shift+click: primer clic = inici, shift+clic = final, omple tot el rang (saltant caps de setmana i festius)

### 3. Selector d'any
- Ara està fixat a 2026 sense opció de canvi
- Afegir botons +/- per navegar anys i actualitzar festius

### 4. Millores visuals de la graella anual
- Les cel·les són massa petites (18px) i difícils de clicar
- Augmentar mida mínima a 22-24px
- Afegir hover effect per indicar que són clicables
- Afegir zebra striping per files d'empleats

### 5. Llegenda de festius
- Afegir una secció plegable que mostri la llista de festius configurats
- Opció d'afegir/treure festius personalitzats (locals)

### 6. Exportar a PDF/Excel
- El botó "Imprimir" fa `window.print()` genèric
- Afegir CSS `@media print` dedicat per millorar el resultat imprès
- Ocultar controls i sidebar en mode impressió

### Ordre d'implementació
1. Responsivitat mòbil (layout + col·lapsable)
2. Shift+click per rang de dies
3. Selector d'any
4. Millores visuals graella (mida cel·les, hover, zebra)
5. Gestió de festius personalitzats
6. CSS d'impressió

