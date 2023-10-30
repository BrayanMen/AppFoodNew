import React from 'react'
import NavBar from './Navbar/NavBar'
import Footer from './Footer/Footer'
import MobileFooter from '../Layouts/Footer/MobileFootbar'

function Layout({children}) {
  return (
    <>
    <div className='bg-white text-black'>
      <NavBar/>
      {children}
      <MobileFooter/>
      <Footer/>
    </div>
    </>
  )
}

export default Layout