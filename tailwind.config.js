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
      }
    }
  },
  plugins: []
}
