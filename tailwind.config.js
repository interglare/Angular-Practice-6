module.exports = {
  mode: 'jit',
  purge: ['applications/**/*','libraries/ui/**/*'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
        textColor: ['disabled'],
        cursor: ['disabled']
    }
},
  plugins: [],
}