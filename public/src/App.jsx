import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import AboutUs from './Screens/AboutUs'
import ContactUs from './Screens/ContactUs'
import NotFound from './Screens/NotFound'
import FavoriteRecipes from './Screens/Dashboard/FavoriteRecipes'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Password from './Screens/Dashboard/Password'
import RecipesPage from './Screens/Recipes'
import SingleRecipe from './Screens/SingleRecipe'

function App() {
  return (
    <>
      <Routes>  
        <Route path='/' element={<HomeScreen />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipe/:id' element={<SingleRecipe />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/profile' element={<Register />} />
        <Route path='/favorite' element={<FavoriteRecipes />} />
        <Route path='/password' element={<Password />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
