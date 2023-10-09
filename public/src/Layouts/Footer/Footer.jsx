import React from 'react'
import logo1 from '../../assets/Logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  const Links =[
    {
      title:'Company',
      links:[
        {
          name:'Inicio',
          link: '/'
        },
        {
          name:'Sobre Mi',
          link: '/about-us'
        },
        {
          name:'Contacto',
          link: '/contact-us'
        },
        {
          name:'Recetas',
          link: '/recipes'
        },
      ]
    },
    {
      title:'Dietas',
      links:[
        {
          name:'Gluten free',
          link: '#'
        },
        {
          name:'Dairy free',
          link: '#'
        },
        {
          name:'Lacto ovo vegetarian',
          link: '#'
        },
        {
          name:'Vegan',
          link: '#'
        },
        {
          name:'Paleolithic',
          link: '#'
        },
        {
          name:'Primal',
          link: '#'
        },
        {
          name:'Whole 30',
          link: '#'
        },
        {
          name:'Pescatarian',
          link: '#'
        },
        {
          name:'Ketogenic',
          link: '#'
        },
        {
          name:'Fodmap friendly',
          link: '#'
        },
      ]
    },
    {
      title:'Mi Cuenta',
      links:[
        {
          name:'Dashboard',
          link: '/dashboard'
        },
        {
          name:'Mi Perfil',
          link: '/profile'
        },
        {
          name:'Favoritos',
          link: '/favorite'
        },
        {
          name:'Cambio de Contraseña',
          link: '/password'
        },
      ]
    },
  ]
  return (
    <div className=' bg-lime-600 py-4 border=t-2 border-lime-900 '>
      <div className='container mx-auto px-2'>
        <div className='grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 py-10 justify-between'>
        {Links.map((link, index)=>(
          <div key={index} className='col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0'>
            <h3 className='text-md lg:leading-7 font-medium mb-4 sm:mb-6 pb-0.5'>
              {link.title}
              </h3>
              <ul className='text-sm flex flex-col space-y-3'>
                {link.links.map((text, index)=>(
                  <li key={index} className='flex items-baseline'>
                    <Link to={text.link} className='text-gray-400 inline-block w-full hover:text-secondary'>
                      {text.name}
                      </Link>
                  </li>
                ))}
              </ul>
          </div>
        ))}
        <div className='pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3'>
          <Link to='/'>
          <img src={logo1} alt='logo'  className='w-2/4 object-contain'/>
          </Link>
          <p className='leading-7 text-sm text-gray-300 mt-3'>
          <span>
          &copy;2023 Brayan Mendoza <br /> All Rights Reserved
          </span>
          <br />
          <span>+(54) 9 11 27300 0038</span>
          <br />
          <a href="mailto:brayanjmr880@gmail.com">brayanjmr880@gmail.com</a>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer