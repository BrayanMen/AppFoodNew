import Layout from '../Layouts/Layout'
import Banner from '../Components/Home/Banner'
import BestScoreRecipes from '../Components/Home/BestScoreRecipes'
import TopRecipes from '../Components/Home/TopRecipes'
import ScrollToTop from '../Utils/ScrollTop'

function HomeScreen() {
  return (
    <Layout>
      <ScrollToTop/>
      <div className='container mx-auto min-h-screen px-2 mb-6'>
      <Banner/>
      <BestScoreRecipes/>
      <TopRecipes/>
      </div>
    </Layout>
  )
}

export default HomeScreen