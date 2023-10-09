/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,}",
    './src/Components/**/*.{js,jsx,}'
  ],
  theme: {
    extend: {
      height:{
        header: '560px',
        rate: '400px'
      },
      fontSize:{
        h1: '2.6rem',
      },
      screens:{
        xs: '475px'
      },
      colors:{
        primary:'#7ed957',
        secondary:"#E22925",
        backgroundColor: '#fcfcfc',
        main: '#000000',
        blueP:' #769fb6',
        greenP:' #32620e',      
      },

    },
  },
  plugins: [

  ],
}

