# Tetris 84 — CK My Apps · Web Edition 2.0

A self-contained historical tribute to the first falling-block game created by Alexey Pajitnov for the Elektronika 60. **This is an unofficial independent tribute, not an authorized Tetris or Nintendo release.** No copyrighted commercial music is bundled. The game draws its own interface with code and ships with the project icon and historical instruction diagram provided by the project owner.

## Run on GitHub Pages

1. Extract the ZIP.
2. Upload **all** of the following to the **repository root**: `index.html`, `style.css`, `engine.js`, `app.js`, `manifest.webmanifest`, the entire `assets` folder, and this README if desired.
3. GitHub repository → **Settings → Pages → Deploy from a branch → main → /(root)**.
4. Open `https://<your-account>.github.io/<your-repository>/`.

There is no server, account, build system, API, dependency, Cloudflare requirement, or payment requirement. Works in current desktop and mobile browsers with HTML5 Canvas, Web Audio and localStorage. The app is also usable by opening `index.html` locally, though GitHub Pages is recommended for mobile installation and browser storage reliability.

## Features

- 10 × 20 board, seven tetrominoes, wall collision, counterclockwise rotation, hard drop and line clear.
- **1984-inspired scoring:** each locked piece earns `max(0, 19 − gravity steps) + 3 × current level + (next-piece preview off ? 5 : 0)`. This means hard drops retain the full starting value. The visible three-digit score rolls at 1000, with `¤` symbols showing thousands. Level selection: 0–9. Level increases with 4/U; it does not automatically increase after line clears.
- English and Russian throughout the interface, remembered per browser.
- Original keypad controls 7 / 9 / 8 / 5 / 1 / 4 / 0 and contemporary keyboard alternatives A/D/W/arrow keys/Space/X/P/U/H/Tab. Escape pauses/resumes. Down/S lets you descend one row manually.
- Touch buttons on touch-enabled devices, repeat on long press, distinct hard drop control. All of the game's content is available from a single responsive web URL.
- Auto-save when a piece locks or gameplay pauses, plus **four manual save slots**. Load resumes paused. A slot stores the grid, piece, level, score, next piece and time. Saved data is held in this browser's localStorage and **does not synchronize between devices**.
- Statistics for completed games: count, high score, lines cleared, pieces placed, best level, session time.
- Original short chiptune-style synthesizer sequence and retro sound effects via Web Audio (two separate on/off controls). Sound requires the first user interaction in browsers. This is **not the copyrighted commercial Tetris recording**.
- Instructions page includes the source diagram, the keyboard/touch control table, original scoring explanation and bilingual historical note.
- CK My Apps credits, project logo, and PayPal Donate URL supplied by the project owner.
- Corrected Tetris 84 app icon and PWA manifest for desktop/mobile browser home screens.

## Faithfulness and limitations

This is a **playable reconstruction**, not a bit-perfect emulation of Elektronika 60 hardware or original source. The rotation logic uses simplified kicks when near a wall and touch interfaces are a modern convenience. Gravity timing is an approximation. Known historic bugs are intentionally not reproduced. The historical score formula follows published documentation; this should not be presented as a fully verified original implementation. No backend or cross-device persistence exists.

## Local tests

Run `node tests/engine.test.js` from a checkout that includes the tests folder. The test checks board dimensions, movement, drops, line clear, save restore, points and rotation. Browser UI/device testing is still recommended before public release.

© 2026 CK My Apps — Created by Christos A. Kazantzoglou.
