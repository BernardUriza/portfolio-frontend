# Between Section Components

This document describes the animated components used in the "What Happens Between Startup and Structure" section.

## `<app-symptom-bar>`

Displays a set of vertical bars animated to mimic a fluctuating speed indicator.

- **Inputs:** none
- **Usage:** visualizes unstable velocity for the "El Síntoma" card.
- **Animation:** CSS keyframe `bar-cycle` running every 2.5s.

## `<app-entropy-wave>`

SVG wave that morphs to represent narrative chaos.

- **Inputs:** none
- **Usage:** part of the "La Realidad" card.
- **Animation:** SVG `<animate>` element with a 3s loop.

## `<app-method-transform>`

Illustrates transformation from catalyst to order using circles and a line.

- **Inputs:** none
- **Usage:** embedded in the "El Método" card.
- **Animation:** SVG animations with a 3s cycle.

Each component is standalone and imported into `app-between`. They scale with their container and include `role="img"` and `aria-label` attributes for accessibility.
