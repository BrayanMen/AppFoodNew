import MainDrawer from './MainDrawer'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'
import { IoMdClose } from 'react-icons/io'
import { GiCookingPot } from 'react-icons/gi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { BiPhoneCall } from 'react-icons/bi'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

function MenuDrawer({ drawerOpen, toggleDrawer }) {

    const Links = [
        {
            name: 'Recipes',
            link: '/recipes',
            icon: GiCookingPot
        },
        {
            name: 'About me',
            link: '/about-us',
            icon: HiOutlineUserGroup
        },
        {
            name: 'Contact',
            link: '/contact-us',
            icon: BiPhoneCall
        },
    ]

    const Network = [
        {
            icon: FaWhatsapp,
            link: "https://wa.me/5491127300038"
        },
        {
            icon: FaGithub,
            link: 'https://github.com/BrayanMen'
        },
        {
            icon: FaLinkedin,
            link: 'https://www.linkedin.com/in/brayan-mendoza-52625a160/'
        },
    ]

    const active = 'bg-blueP bg-opacity-60 text-secondary';
    const hover = 'hover:text-black hover:bg-primary';
    const inActive =
        'rounded font-medium text-sm  transitions flex gap-4 items-center p-4';

    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

    return (
        <MainDrawer
            drawerOpen={drawerOpen}
            closeDrawer={toggleDrawer}>
            <div className='flex flex-col w-full h-full justify-between items-center bg-greenP text-white rounded'>
                <div className='w-full flex-btn h-16 px-6 py-4 bg-greenP'>
                    <Link to='/' onClick={toggleDrawer}>
                        <img
                            src={Logo}
                            alt="logo"
                            className='w-20 h-20 p-2 object-contain' />
                    </Link>
                    <button
                        onClick={toggleDrawer}
                        type='button'
                        className='transitions w-10 h-10 text-base text-white bg-secondary border border-transparent rounded-full flex-colo hover:bg-white hover:text-secondary'>
                        <IoMdClose />
                    </button>
                </div>
                <div className='w-full mt-2 flex-grow max-height-full'>
                    <div className='pb-12 pt-8'>
                    {Links.map((link, i) => (
                        <NavLink to={link.link} key={i} onClick={toggleDrawer} className={Hover}>
                            <link.icon className='text-2xl' /> {link.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='flex-rows gap-6 w-full'>
                {Network.map((n, i) => (
                    <a href={n.link} key={i} className='flex-colo w-16 h-16 transitions rounded bg-green-700 bg-opacity-30 hover:bg-primary hover:text-black'>
                        <n.icon className='text-3xl' />
                    </a>
                ))}
            </div>
        </div>
        </MainDrawer >
    )
}

export default MenuDrawer