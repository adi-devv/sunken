# SUNKEN

A calm 3D underwater exploration game, drawn entirely with text characters in the browser.

Dive from the kelp shallows down the reef slope and through the twilight trench to a drowned temple on the midnight floor. The city's eight beacons have gone dark. Each relic you find relights one, sending a pillar of gold light up to the surface, and upgrades your lamp, sonar or fins. There's no danger and no timer.

Every frame is ray-marched on the CPU, one ray per character cell, then shaded with colour, fog, light shafts and glow. Everything is in a single HTML file with no dependencies.

## Play

Open `sunken.html` in Chrome or Edge, or serve the folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/sunken.html and click to dive.

## Controls

| Key | Action |
|---|---|
| WASD + mouse | swim and look (click to lock the mouse; if the lock is refused, push the cursor to an edge to turn) |
| Arrow keys | look |
| Space / C or Ctrl | rise / sink |
| Shift | swim faster |
| Q | sonar ping |
| J | journal |
| M | mute |
| P / Esc | pause |
| [ ] | smaller / larger glyphs |
