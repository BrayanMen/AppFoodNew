import SideBar from '../../../Screens/Dashboard/SideBar'
import { recipes } from '../../../data/recipes'
import Table from '../../../Components/Table'


function RecipesList() {
  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-semibold'>Recipes List</h2>
          <button className='font-medium transitions hover:bg-secondary border border-secondary py-1.5 px-3 rounded'>Delete All</button>
        </div>
        <Table recipes={recipes} admin={false}/>
      </div>
    </SideBar>
  )
}

export default RecipesList