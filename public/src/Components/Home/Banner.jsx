import React from 'react'
import {Autoplay} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { recipes } from '../../data/recipes'
import FlexRecipeItems from '../FlexRecipeItems'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

function Banner() {
    return (
        <div className='relative w-full'>
            <Swiper
                direction='vertical'
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: true }}
                className='w-full xl:h-96 bg-lime-600 lg:h-64 h-48'>
                {recipes.slice(0,6).map((r, index)=>(
                    <SwiperSlide key={index} className='relative rounded overflow-hidden'>
                        <img 
                        src={`${r.image}`} 
                        alt={r.name} 
                        className='w-full h-full object-cover'/>
                        <div 
                        className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
                            <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold'>
                                {r.name}
                            </h1>
                            <div className='flex gap-5 items-center text-gray-300'>
                                <FlexRecipeItems recipe={r}/>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <Link 
                                to={`/recipe/${r.name}`} 
                                className='bg-primary hover:text-lime-950 transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'>
                                    Ver Receta
                                </Link>
                                <button 
                                className='bg-white hover:text-secondary transitions text-white px-4 py-3 rounded text-sm bg-opacity-30'>
                                    <FaHeart/>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Banner