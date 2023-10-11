import Layout from '../Layouts/Layout'
import Banner from '../Components/Home/Banner'
import BestScoreRecipes from '../Components/Home/BestScoreRecipes'
import TopRecipes from '../Components/Home/TopRecipes'

function HomeScreen() {
  return (
    <Layout>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
      <Banner/>
      <BestScoreRecipes/>
      <TopRecipes/>
      </div>
    </Layout>
  )
}

export default HomeScreen