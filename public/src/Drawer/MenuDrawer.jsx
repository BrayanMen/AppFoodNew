import MainDrawer from './MainDrawer'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'
import { IoMdClose } from 'react-icons/io'

function MenuDrawer({ drawerOpen, toggleDrawer }) {
    return (
        <MainDrawer
            drawerOpen={drawerOpen}
            closeDrawer={toggleDrawer}>
            <div className='flex flex-col w-full h-full justify-between items-center bg-primary text-white rounded'>
                <div className='w-full flex-btn h-16 px-6 py-4 bg-greenP'>
                    <Link to='/' onClick={toggleDrawer}>
                        <img
                            src={Logo}
                            alt="logo"
                            className='w-28 h-28 object-contain' />
                    </Link>
                    <button
                        onClick={toggleDrawer}
                        type='button'
                        className='transitions w-10 h-10 text-base text-white bg-secondary border border-transparent rounded-full flex-colo hover:bg-white hover:text-secondary'>
                        <IoMdClose />
                    </button>
                </div>
            </div>
        </MainDrawer>
    )
}

export default MenuDrawer