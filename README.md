# SUNKEN

A calm 3D underwater exploration game, drawn entirely in text characters in your browser.

**▶ Play: https://adi-devv.github.io/sunken/**

![SUNKEN title screen](screenshot.jpg)

Dive through kelp, reefs and a dark trench to find the eight relics that relight the beacons of sunken Atlantis. Whistle for dolphins and they'll guide you to the next one. Come up for air and walk around a small beach island. There's no danger and no timer.

Every frame is ray-marched on the CPU, one ray per character. It's a single HTML file with no dependencies.

## Controls

| Key | Action |
|---|---|
| WASD + mouse | swim and look |
| E / Q | rise / sink |
| Shift | swim fast |
| F | whistle for dolphins |
| Space (on land) | jump |
| J / M / P | journal / mute / pause |

## Run locally

Open `sunken.html` in Chrome or Edge, or run `python -m http.server 8000` and go to http://localhost:8000/sunken.html.
