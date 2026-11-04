# Tennis Coach

Diario delle partite e tips di tecnica e tattica, come web app installabile sul telefono (PWA).

**App:** https://sosergio.github.io/tennis-coach/

- **Diario**: a fine partita registri risultato, punteggio game per game, come ti sei sentito (frustrazione, felicità, calma), piano di gioco e punti decisivi.
- **Tips**: colpi da fondo, servizio, parole chiave e tattica, da rileggere prima di entrare in campo.
- **Altro**: backup (export/import JSON) e risorse.

## Installare sul telefono
- **iPhone**: apri il link in Safari → Condividi → *Aggiungi alla schermata Home*.
- **Android**: apri il link in Chrome → menu ⋮ → *Installa app*.

Funziona anche offline. I dati restano sul telefono (localStorage): usa l'export nell'app per fare un backup.

## Struttura
- `index.html`: tutta l'app (HTML, CSS e JS in un file)
- `manifest.json`, `service-worker.js`: installazione e funzionamento offline
- `icons/`: icone dell'app (`icon.svg` è la sorgente)

Pubblicata con GitHub Pages dal branch `main`. Dopo una modifica, aumenta `CACHE_NAME` in `service-worker.js` così i telefoni scaricano la nuova versione.
