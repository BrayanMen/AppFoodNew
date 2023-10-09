import React from 'react'
import NavBar from './Navbar/NavBar'
import Footer from './Footer/Footer'

function Layout({children}) {
  return (
    <>
    <div className='bg-white text-black'>
      <NavBar/>
      {children}
      <Footer/>
    </div>
    </>
  )
}

export default Layout