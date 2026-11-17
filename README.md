# SUNKEN

A calm 3D underwater exploration game, drawn entirely with text characters in the browser.

Long ago the city of Atlantis sank beneath the sea, and one by one its eight great beacons went dark. You dive from the kelp shallows down the reef slope and through the twilight trench to the drowned temple on the midnight floor. Each relic you find relights a beacon. A pillar of gold light rises to the surface, the old stonework around it starts to glow, and your lamp, whistle or fins get an upgrade. There's no danger and no timer.

You aren't alone down there. Whistle (F) and a pod of dolphins will come to you, circle you, then lead you to the next relic, with the leader glowing so you can follow it through the dark. Sea turtles and manta rays drift around the ruins and answer the whistle too. Reef sharks patrol nearby and keep their distance. Schools of fish and silver bait balls swirl past you, crabs and starfish crawl along the floor, and jellyfish drift from the shallows down to the deep. The water is murky: it gets darker and closer the deeper you go.

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
| WASD + mouse | swim and look (the mouse locks at the centre when you dive, or on any key press) |
| E / Q | rise / sink (Space and C also work) |
| Shift | swim fast |
| F or right-click | whistle for the dolphins and other animals |
| Arrow keys | look |
| J | journal |
| M | mute |
| P / Esc | pause |
| - / + | smaller / larger HUD text |
| [ ] | smaller / larger world glyphs |

Mouse lock needs a normal browser tab. Embedded previews (like an editor's built-in browser) refuse it. There, move the mouse away from the centre of the screen to turn.
