import React from 'react'
import Layout from '../Layouts/Layout'
import Head from '../Components/Head'

function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 py-6'>
        <Head title='Sobre mi' />
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold '>
                ¿Quién soy?
              </h3>
            </div>
            <div className='mt-3 text-sm leading-8'>
              <p>
                Mi nombre es Brayan Mendoza, soy un Full Stack Developer con background en atención al cliente, area de servicio e instructor de artes
                marciales que me ayudaron a obtener skills como manejo de grupos, ser disciplinado, comunicativo,
                estricto, autodidacta y resolutivo; desde finales de 2021 me he estado formando como desarrollador web
                por mi afinidad por la tecnología. Soy perseverante, dedicado, un amante de la tecnología y el JavaScript.
              </p>
            </div>
          </div>
          <br />
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold '>
                ¿De que trata este Proyecto?
              </h3>
            </div>
            <div className='mt-3 text-sm leading-8'>
              <p>
                Somos una plataforma de recetas apasionados por la cocina y la tecnología. En el backend, utilizamos Express.js y MongoDB para almacenar recetas de Spoonacular de manera eficiente. Garantizamos tu seguridad con autenticación de usuarios basada en JWT.
              </p>
              <p>En el frontend, ofrecemos una experiencia inmersiva con React y Redux. Explora las mejores recetas y disfruta de un panel de control. Solo los usuarios autenticados pueden crear, editar y eliminar recetas, y cambiar contraseñas.</p>
              <p>Hemos implementado roles de usuario para administradores, lo que permite una gestión efectiva de la plataforma.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs