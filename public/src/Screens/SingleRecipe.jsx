import React from 'react'
import { useParams } from 'react-router-dom'
import RecipeInfo from '../Components/Cards/RecipeInfo.jsx'
import { recipes } from '../data/recipes.jsx';
import Layout from '../Layouts/Layout.jsx';

function SingleRecipe() {
  const {id} = useParams();
  const recipe = recipes.find((r) => r.name === id)

  return (  
      <Layout>
      <RecipeInfo recipe={recipe}/>
      </Layout>
  )
}

export default SingleRecipe