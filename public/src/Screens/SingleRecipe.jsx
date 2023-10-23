import { useParams } from 'react-router-dom'
import RecipeInfo from '../Components/Cards/RecipeInfo.jsx'
import { recipes } from '../data/recipes.jsx';
import Layout from '../Layouts/Layout.jsx';
import ScrollToTop from '../Utils/ScrollTop.jsx';
import RecipeRate from '../Components/Cards/RecipeRate.jsx';
import Titles from '../Components/Titles.jsx';
import { BsCollectionFill } from 'react-icons/bs';
import Recipe from '../Components/Recipe.jsx';

function SingleRecipe() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.name === id)
  const RelatedRecipe = recipes.filter((r)=> r.diets === recipe.diets)

  return (
    <Layout>
      <ScrollToTop />
      <RecipeInfo recipe={recipe} />
      <div className='container m-auto min-h-screen my-6 px-2'>
        <RecipeRate recipe={recipe} />
        <div className='my-16'>
          <Titles title='Title' Icon={BsCollectionFill} />
          <div className='grid sm:mt-12 mt-6 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {
              RelatedRecipe.map((recipe, index) => (
                <Recipe key={index} recipe={recipe} />
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SingleRecipe