import Layout from '../Layouts/Layout'
import food from '../assets/food2.jpg'
import Head from '../Components/Head'
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import ScrollToTop from '../Utils/ScrollTop'

function ContactUs() {
  const contactData = [
    {
      id: 1,
      title: 'Envíanos un correo electrónico',
      info: 'Desarrolla ideas de backend de forma interactiva para un modelo multiplataforma.',
      icon: FiMail,
      contact: 'brayanjmr880@gmail.com',
    },
    {
      id: 2,
      title: 'Llámanos',
      info: 'Aprovecha al máximo las alineaciones óptimas para lograr resultados intuitivos.',
      icon: FiPhoneCall,
      contact: '+54 9 11 2730 0038',
    },
    {
      id: 3,
      title: 'Dirección',
      info: 'Avellaneda, Buenos Aires, Argentina.',
      icon: FiMapPin,
      contact: '',
    },
  ]
  return (
    <Layout>
      <ScrollToTop/>
      <div className='min-height-screen container mx-auto px-2 py-6'>
        <Head title='Contacto' image={food} />
        <div className='grid mg:grid-cols-2 gap-5 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8'>
          {
            contactData?.map((e) => (
              <div key={e.id} className='border border-greenP flex-colo p-10 bg-primary rounded-lg shadow-md text-center'>
                <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-greenP text-secondary'>
                  <e.icon></e.icon>
                </span>
                <h3 className='text-xl font-semibold mb-2'>{e.title}</h3>
                <p className='mb-0 text-sm text-gray-900 leading-7'>
                  <a href={`mailto:${e.contact}`} className='text-blue-500'>{e.contact}</a>
                  <br />
                  <p className='font-semibold'> 
                  {e.info}
                  </p>
                </p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs