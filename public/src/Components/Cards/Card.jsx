import { useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import ModalDetails from './ModalDetails.jsx';
// import { Link } from 'react-router-dom';

function Card({ recipe, handleCardClick}) {

    const healthScoreColor = (recipe) => {
        if (recipe.health_score >= 66) return 'text-green-500';
        if (recipe.health_score >= 33) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div key={recipe.name} className="mb-4 mx-4 sm:w-72 md:w-96 lg:w-72 xl:w-72 sm:h-64 md:h-80 lg:h-80 xl:h-80  bg-primary bg-opacity-50 backdrop-blur-sm  z-10 rounded-lg shadow-md">
            <div className="relative">
                <img src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                    onClick={() => handleCardClick(recipe)} />
                <p className={`absolute flex flex-row right-0 bottom-0 p-2 font-semibold bg-white ${healthScoreColor(recipe)} bg-aqua border rounded-tl-lg`}>
                    {recipe.health_score}% <FaHeart />
                </p>
            </div>
            <div className="flex flex-col p-4">
                <p className="mt-0">{recipe.name}</p>
                <span className='flex flex-row items-center'>{recipe.reviews.rating}<FaStar className="text-yellow-500" /></span>
            </div>
            
        </div >
    )
}

export default Card