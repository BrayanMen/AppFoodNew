import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import ContactUs from './Screens/ContactUs';
import NotFound from './Screens/NotFound';
import FavoriteRecipes from './Screens/Dashboard/FavoriteRecipes';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Password from './Screens/Dashboard/Password';
import RecipesPage from './Screens/Recipes';
import SingleRecipe from './Screens/SingleRecipe';
import Profile from './Screens/Dashboard/Profile';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import aos from 'aos';
import RecipesList from './Screens/Dashboard/Admin/RecipesList';
import Diets from './Screens/Dashboard/Diets';
import Users from './Screens/Dashboard/Admin/Users';
import AddRecipes from './Screens/Dashboard/AddRecipes';
import ScrollToTop from './ScrollTop';
import DrawerContext from './Context/DrawerContext';

function App() {
  aos.init();
  return (
    <DrawerContext>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipelist" element={<RecipesList />} />
          <Route path="/addrecipe" element={<AddRecipes />} />
          <Route path="/diets" element={<Diets />} />
          <Route path="/users" element={<Users />} />

          <Route path="/favorite" element={<FavoriteRecipes />} />
          <Route path="/password" element={<Password />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </DrawerContext>
  );
}

export default App;
