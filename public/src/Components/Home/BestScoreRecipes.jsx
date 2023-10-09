import React from 'react'
import Titles from '../Titles'
import { FaBowlFood } from 'react-icons/fa6'
import { recipes } from '../../data/recipes'
import Recipe from '../Recipe'

function BestScoreRecipes() {
  return (
    <div className='my-16'>
      <Titles title='Recetas mas Sanas' Icon={FaBowlFood}/>
      <div className='grid sm:mt-12 mt-6 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {
          recipes.slice(0, 6).map((recipe, index)=>(
            <Recipe key={index} recipe={recipe}/>            
          ))
        }
      </div>
    </div>
  )
}

export default BestScoreRecipes