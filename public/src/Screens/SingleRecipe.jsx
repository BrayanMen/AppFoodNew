import { useParams } from 'react-router-dom'
import RecipeInfo from '../Components/Cards/RecipeInfo.jsx'
import { recipes } from '../data/recipes.jsx';
import Layout from '../Layouts/Layout.jsx';
import ScrollToTop from '../Utils/ScrollTop.jsx';
import RecipeRate from '../Components/Cards/RecipeRate.jsx';

function SingleRecipe() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.name === id)

  return (
    <Layout>
      <ScrollToTop />
      <RecipeInfo recipe={recipe} />
      <RecipeRate recipe={recipe} />
    </Layout>
  )
}

export default SingleRecipe