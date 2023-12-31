import { useState } from 'react'
import Titles from '../Titles';
import { BsBookmarkStarFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { recipes } from '../../data/recipes';
import { Link } from 'react-router-dom';
import Rating from '../Stars';

function TopRecipes() {
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  return (
    <div className='my-16'>
      <Titles title='Top  Recipes' Icon={BsBookmarkStarFill} />
      <div className='mt-10'>
        <Swiper
          navigation={{ next, prev }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            400: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
        >
          {
            recipes.map((recipe, index) => (
              <SwiperSlide key={index}>
                <div className='p-4 h-rate hovered border border-gray-500 bg-greenP bg-opacity-50 rounded-lg overflow-hidden'>
                  <img src={`${recipe.image}`} alt={`${recipe.name}`} className='w-full h-full object-cover rounded-lg' />
                  <div className='px-4 ga-6 hoveres text-center absolute bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0'>
                    <button className='w-12 h-12 flex-colo transitions hover:bg-secondary rounded-full bg-white bg-opacity-30 text-white'>
                      <FaHeart />
                    </button>
                    <Link to={`/recipe/${recipe.name}`} className='font-semibold text-xl truncated line-clamp-2 text-white'>
                      {recipe.name}
                    </Link>
                    <div className='flex gap-2 text-yellow-500  '>
                      <Rating value={recipe.reviews.rating} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default TopRecipes