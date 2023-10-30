import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo1 from '../../assets/Logo.jpg';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';

function NavBar() {
  const hover = 'hover:text-secondary transitions text-white';
  const Hover = ({ isActive }) => (isActive ? 'hover:text-secondary' : hover);
  return (
    <>
      <div className=" bg-greenP shadow-md sticky top-0 z-20">
        <div className="container bg-greenP mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/*Logo*/}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src={logo1}
                className="w-full h-12 object-contain hover:scale-150"
              />
            </Link>
          </div>
          {/*SearchBar*/}
          <div className="col-span-3">
            <form className="w-full text-sm bg-gray-200 rounded-full flex-btn gap-4 ">
              <button
                type="submit"
                className="bg-secondary w-12 flex-colo h-12 rounded-s-full text-white "
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Busca tu receta..."
                className=" font-medium placeholder:text-gray-500 text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/*Menu*/}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/recipes" className={Hover}>
              Recipes
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About me
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact
            </NavLink>
            <NavLink to="/login" className={Hover}>
              <CgUser className="w-8 h-8" />
            </NavLink>
            <NavLink to="/favorite" className={Hover}>
              <div className="relative">
                <div className="w-5 h-5 flex-colo rounded-full text-xs bg-secondary text-white absolute -top-5 -right-1">
                  3
                </div>
              </div>
              <FaHeart className="text-xl" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
