import React from 'react'
import { diets } from '../data/recipes'
import { FaRegCalendarAlt, FaHeart } from 'react-icons/fa'

function FlexRecipeItems({ recipe }) {
  const dietNames = recipe.diets.map((dietId) => {
    const matchingDiet = diets.find((d) => d._id === dietId)
    return matchingDiet ? matchingDiet.name : 'Desconocida';
  })

  const healthScoreColor = () => {
    if (recipe.health_score >= 66) return 'text-green-500';
    if (recipe.health_score >= 33) return 'text-yellow-500';
    return 'text-red-500';
  };
  return (
    <>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium'>
          {dietNames.join(', ')}
        </span>
      </div>
      <div className='flex items-center gap-2'>
      {recipe.health_score &&<FaHeart  className={`${healthScoreColor()} w-5 h-5`}/>}
        <span className='text-sm font-medium'>         
            <span>                    
            {recipe.health_score}%
            </span>
        </span>
      </div>
    </>
  )
}

export default FlexRecipeItems