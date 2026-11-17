# SUNKEN

A calm 3D underwater exploration game, drawn entirely with text characters in the browser.

Atlantis is still down there, whole: glass domes, light-banded towers, transit tubes and gates of glowing pylons, spread from the kelp shallows to the great hall on the midnight floor. But its eight beacons have gone dark and the city has lost its power. You dive down the reef slope and through the twilight trench, and each relic you find relights a beacon. A pillar of gold light rises to the surface, the panel seams and light strips of the buildings around it power back up, and your lamp, whistle or fins get an upgrade. There's no danger and no timer.

The sea floor is thick with life: kelp forests and sea-grass meadows in the shallows; sea fans, staghorn, brain coral, sponges and anemones on the reef; tube worms and glowing growths in the deep.

You aren't alone down there. Whistle (F) and a pod of dolphins will come to you, circle you, then lead you to the next relic, with the leader glowing so you can follow it through the dark. Sea turtles and manta rays drift between the towers and answer the whistle too. Reef sharks patrol nearby and keep their distance. Schools of fish and silver bait balls swirl past you, crabs and starfish crawl along the floor, and jellyfish drift from the shallows down to the deep. The water is murky: it gets darker and closer the deeper you go.

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
