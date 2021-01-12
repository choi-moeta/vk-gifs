module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      zIndex: [ 'hover', 'active' ],
      borderRadius: [ 'hover', 'group-hover' ],
      ringWidth: [ 'hover', 'focus-visible' ],
      display: [ 'group-hover', 'focus', 'first' ],
      opacity: [ 'hover', 'focus-visible' ],
      padding: [ 'hover', 'group-hover' ],
      margin: [ 'hover', 'group-hover' ],
      height: [ 'hover', 'group-hover', 'group-focus', 'focus-within' ],
      transform: [ 'hover' ],
      scale: [ 'hover' ],
      textColor: [ 'focus-visible' ],
    },
  },
  plugins: [],
}
