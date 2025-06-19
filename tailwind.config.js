module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'antracita': '#1C1C1E',
        'azul-noche': '#121826',
        'purpura-profundo': '#3B1F47',
        'rojo-oscuro': '#8B0000',
        'dorado': '#BFA16A',
        'gris-claro': '#CCCCCC',
        'gris-medio': '#888888',
      },
      fontFamily: {
        'heading': ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        'body': ['"Inter"', '"Open Sans"', 'sans-serif']
      },
      boxShadow: {
        'dorado': '0 0 10px 2px rgba(191, 161, 106, 0.7)',
        'rojo-oscuro': '0 0 8px 2px rgba(139, 0, 0, 0.6)',
        'inner-glow': 'inset 0 0 10px rgba(191, 161, 106, 0.3)',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(191, 161, 106, 0.7)' },
          '50%': { boxShadow: '0 0 10px 4px rgba(191, 161, 106, 0.5)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'pulse-dorado': 'pulse-dorado 2s infinite',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')]
}
