import Layout from '../Layouts/Layout'
import Logo from '../assets/Logo.jpg'
import { Input } from '../Components/UsedInputs'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

function Login() {
  return (
    <Layout>
      <div className='container mx-auto px-2 my-24 flex-colo'>
        <div className='w-full 2xl:w-2/5 gap-8 flex-colo p-14 md:w-3/5 bg-greenP text-white rounded-lg border border-primary'>
          <img src={Logo} alt="logo" className='w-full h-20 object-contain' />
          <Input label='Email' placeholder='example@mail.com...' type='email' bg={true}/>
          <Input label='Password' placeholder='Password...' type='password' bg={true}/>
          <Link to='/dashboard' className='bg-secondary font-semibold transitions hover:bg-primary hover:text-black flex-rows gap-1 text-white p-3 rounded-lg'>
            <FiLogIn/>Login
          </Link>
          <p>
            Don't have an account{' '}
            <Link to='/register' className='text-secondary hover:text-red-500 font-semibold ml-2'>Register</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Login