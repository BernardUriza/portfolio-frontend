module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'antracita': '#1C1C1E',           // se mantiene
        'azul-noche': '#121826',          // se mantiene
        'purpura-profundo': '#3B1F47',    // se mantiene
        'rojo-oscuro': '#7A0000',         // un toque más apagado, menos saturado
        'dorado': '#BFA16A',              // se mantiene como acento
        'gris-claro': '#CCCCCC',          // se mantiene
        'gris-medio': '#888888',          // se mantiene
        'holo-blue': '#264B5D',           // de neón pasa a un azul velado, profundo
        'saber-blue': '#2F4858',          // azul más serio, menos saturado
        'neon-purple': '#4B3B57',         // púrpura profundo, sin brillar como neón
        'cyber-green': '#294F44',         // verde oscuro, sofisticado, no fosforescente
      },
      fontFamily: {
        'heading': ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        'body': ['"Inter"', '"Open Sans"', 'sans-serif'],
        'cyber': ['"Orbitron"', 'sans-serif'], 
      },
      boxShadow: {
        'dorado': '0 0 8px 2px rgba(191, 161, 106, 0.3)',
        'rojo-oscuro': '0 0 6px 1px rgba(122, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 10px rgba(191, 161, 106, 0.2)',
        'holo': '0 0 8px rgba(38, 75, 93, 0.4)',
        'saber': '0 0 8px rgba(47, 72, 88, 0.4)',
        'neon-purple': '0 0 8px rgba(75, 59, 87, 0.4)',
        'cyber-green': '0 0 8px rgba(41, 79, 68, 0.4)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-dorado': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(191, 161, 106, 0.3)' },
          '50%': { boxShadow: '0 0 8px 3px rgba(191, 161, 106, 0.2)' },
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 4px #264B5D' },
          '50%': { textShadow: '0 0 8px #264B5D' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        'neon-bounce': {
          '0%': { textShadow: '0 0 6px #ffd700, 0 0 18px #fffbe6', filter: 'brightness(1.1)', transform: 'translateY(0) scale(1)' },
          '45%': { textShadow: '0 0 28px #ffd700, 0 0 44px #fffbe6', filter: 'brightness(1.35)', transform: 'translateY(-4px) scale(1.06)' },
          '100%': { textShadow: '0 0 6px #ffd700, 0 0 18px #fffbe6', filter: 'brightness(1.1)', transform: 'translateY(0) scale(1)' },
        },
        'neon-red': {
          '0%': { textShadow: '0 0 12px #ff3232', filter: 'brightness(1)', },
          '55%': { textShadow: '0 0 32px #ff3232, 0 0 18px #7A0000', filter: 'brightness(1.6)' },
          '100%': { textShadow: '0 0 12px #ff3232', filter: 'brightness(1)', },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '.85' },
          '15%': { opacity: '1' },
          '25%': { opacity: '.95' },
          '35%': { opacity: '.7' },
          '45%': { opacity: '1' },
          '60%': { opacity: '.9' },
          '80%': { opacity: '1' },
        },
         'neon-purple': {
            '0%': {
              textShadow: '0 0 10px #7f3be7, 0 0 24px #ab65f7, 0 0 44px #6f2da8',
              filter: 'brightness(1.15)',
              transform: 'translateY(0) scale(1)'
            },
            '45%': {
              textShadow: '0 0 24px #ab65f7, 0 0 56px #bfa16a, 0 0 74px #6f2da8',
              filter: 'brightness(1.4)',
              transform: 'translateY(-4px) scale(1.07)'
            },
            '100%': {
              textShadow: '0 0 10px #7f3be7, 0 0 24px #ab65f7, 0 0 44px #6f2da8',
              filter: 'brightness(1.15)',
              transform: 'translateY(0) scale(1)'
            }
          },
      },
      animation: {
        'neon-purple': 'neon-purple 1.7s infinite cubic-bezier(0.61,0.12,0.68,1.4)',
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'pulse-dorado': 'pulse-dorado 2s infinite',
        'glow-pulse': 'glow-pulse 2s infinite',
        'glitch': 'glitch 0.5s infinite',
        'neon-bounce': 'neon-bounce 1.7s infinite cubic-bezier(0.61, 0.12, 0.68, 1.4)',
        'neon-red': 'neon-red 1.5s infinite cubic-bezier(0.71, 0.14, 0.99, 0.52)',
        'neon-flicker': 'neon-flicker 2.2s infinite',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}