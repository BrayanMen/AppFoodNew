import React from 'react'
import NavBar from './Navbar/NavBar'
import Footer from './Footer/Footer'

function Layout({children}) {
  return (
    <>
    <div className='bg-primary text-white'>
      <NavBar/>
      {children}
      <Footer/>
    </div>
    </>
  )
}

export default Layout