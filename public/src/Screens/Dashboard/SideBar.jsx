import React from 'react';
import { BsFillGridFill } from 'react-icons/bs';
import { FaHeart, FaListAlt, FaUser } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { GiCook, GiCookingPot } from 'react-icons/gi';
import { PiPasswordBold } from 'react-icons/pi';
import Layout from '../../Layouts/Layout';
import { NavLink } from 'react-router-dom';

function SideBar({ children }) {
  const active = 'bg-blueP bg-opacity-60 text-secondary';
  const hover = 'hover:text-black hover:bg-primary';
  const inActive =
    'rounded font-medium text-sm  transitions flex gap-3 items-center p-4';

  const Hover = ({ isActive }) => 
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  const SideLinks = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: BsFillGridFill,
    },
    {
      name: 'Recipe List',
      link: '/recipelist',
      icon: FaListAlt,
    },{
      name: 'Diets',
      link: '/diets',
      icon: GiCookingPot,
    },
    {
      name: 'Add recipe',
      link: '/addrecipe',
      icon: GiCook,
    },
    {
      name: 'Users',
      link: '/users',
      icon: FaUser,
    },
    {
      name: 'Update Profile',
      link: '/profile',
      icon: FiSettings,
    },
    {
      name: 'Favorites Recipes',
      link: '/favorite',
      icon: FaHeart,
    },
    {
      name: 'Change Password',
      link: '/password',
      icon: PiPasswordBold,
    },
  ];
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="lg:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky text-white bg-greenP border border-primary p-6 rounded-md lg:mb-0 mb-5">
          {SideLinks?.map((link, i) => (
            <NavLink to={link.link} key={i} className={Hover}>
              <link.icon className='text-xl'/>
              <p>{link.name}</p>
            </NavLink>
          ))}
          </div>
          <div 
          data-aos='fade-left' 
          data-aos-duration='1000'
          data-aos-delay='10'
          data-aos-offset='20'
          className='col-span-6 rounded-md bg-greenP border border-primary p-6 text-white'>{children}</div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
