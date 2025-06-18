import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0, left: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('350ms cubic-bezier(.93,.01,.63,.93)', style({
          opacity: 0,
          filter: 'blur(8px) grayscale(100%)',
          transform: 'scale(0.85) rotateY(-16deg) skewY(2deg)'
        }))
      ], { optional: true }),
      query(':enter', [
        style({
          opacity: 0,
          filter: 'blur(6px) grayscale(80%)',
          transform: 'scale(1.06) rotateY(12deg) skewY(-1.5deg)'
        }),
        animate('420ms cubic-bezier(.18,1.19,.66,.99)',
          style({
            opacity: 1,
            filter: 'none',
            transform: 'none'
          })
        )
      ], { optional: true }),
    ])
  ])
]);
