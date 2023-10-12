import React, { useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
// import ModalDetails from './ModalDetails';

function Card({ recipe }) {
    // const [isOpen, setIsOpen] = useState(false)

    // const toggleModal = () => {
    //     setIsOpen(!isOpen)
    // }

    const healthScoreColor = (recipe) => {
        if (recipe.health_score >= 66) return 'text-green-500';
        if (recipe.health_score >= 33) return 'text-yellow-500';
        return 'text-red-500';
      };


    return (
        <div key={recipe.name} className="mb-4 mx-4 sm:w-72 md:w-96 lg:w-72 xl:w-72 sm:h-64 md:h-64 lg:h-80 xl:h-80 border border-black rounded-lg shadow-md">
            <div className="relative">
                <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover rounded-t-lg" />
                <p className={`absolute flex flex-row right-0 bottom-0 p-2 font-semibold bg-white ${healthScoreColor(recipe)} bg-aqua border rounded-tl-lg`}>
                    {recipe.health_score}% <FaHeart />
                </p>
            </div>
            <div className="flex flex-col p-4">
                <p className="mt-0">{recipe.name}</p>
                <span className='flex flex-row items-center'>{recipe.reviews.rating}<FaStar className="text-yellow-500" /></span>
            </div>
            {/* { isOpen && <ModalDetails recipe={recipe} toggleModal={toggleModal} /> } */}
        </div >
    )
}

export default Card