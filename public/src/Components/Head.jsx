import React from 'react'
import aboutme from '../assets/Aboutme.jpg'

function Head({ title }) {
    return (
        <div className='w-full bg-blueP lg:h-64 h-40 relative overflow-hidden rounded-md'>
            <img src={aboutme} alt="aboutme" className='w-full h-full object-cover filter blur-sm' />
            <div className='absolute lg:top-24 top-16  w-full flex-colo'>
                <h1 className='text-2xl lg:text-h1 text-white text-center font-semibold'>
                    {title && title}
                </h1>
            </div>
        </div>
    )
}

export default Head;