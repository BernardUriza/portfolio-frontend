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
        'holo-blue': '#00f0ff',
        'saber-blue': '#3be8f3',
        'neon-purple': '#b45cff',
        'cyber-green': '#00ff88',
      },
      fontFamily: {
        'heading': ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        'body': ['"Inter"', '"Open Sans"', 'sans-serif'],
        'cyber': ['"Orbitron"', 'sans-serif'], 
      },
      boxShadow: {
        'dorado': '0 0 10px 2px rgba(191, 161, 106, 0.7)',
        'rojo-oscuro': '0 0 8px 2px rgba(139, 0, 0, 0.6)',
        'inner-glow': 'inset 0 0 10px rgba(191, 161, 106, 0.3)',
        'holo': '0 0 12px rgba(0, 240, 255, 0.6)',
        'saber': '0 0 14px rgba(59, 232, 243, 0.6)',
        'neon-purple': '0 0 14px rgba(180, 92, 255, 0.6)',
        'cyber-green': '0 0 14px rgba(0, 255, 136, 0.6)',
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
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 6px #00f0ff' },
          '50%': { textShadow: '0 0 12px #00f0ff' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'pulse-dorado': 'pulse-dorado 2s infinite',
        'glow-pulse': 'glow-pulse 2s infinite',
        'glitch': 'glitch 0.5s infinite',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
