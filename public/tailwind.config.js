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
        primary:'#17a2b8',
        secondary:"#39c5d6",
        backgroundColor: '#fcfcfc',
      },

    },
  },
  plugins: [

  ],
}

