# Between Section Components

This document describes the animated components used in the "What Happens Between Startup and Structure" section.

## `<app-symptom-bar>`

Displays dynamic representations of instability.

- **Inputs:** none
- **Usage:** visualizes unstable velocity for the "El Síntoma" card.
- **Animation:** Three Tailwind-driven styles (`BARS`, `DOTS`, `BLOCKS`) rotate every 10 seconds.

## `<app-entropy-wave>`

Tailwind elements that form waves, dots or pulsing grids.

- **Inputs:** none
- **Usage:** part of the "La Realidad" card.
- **Animation:** One of three visual styles chosen at random and cycled every 10 seconds.

## `<app-method-transform>`

Shows a catalyst flow with circles, cubes or spinning rings.

- **Inputs:** none
- **Usage:** embedded in the "El Método" card.
- **Animation:** Style rotates randomly among three options every 10 seconds.

Each component is standalone and imported into `app-catalytic-architecture`. They scale with their container and rely solely on Tailwind CSS for animation.
