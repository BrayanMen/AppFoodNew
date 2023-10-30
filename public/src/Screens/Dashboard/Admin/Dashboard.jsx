import SideBar from '../../../Screens/Dashboard/SideBar'
import { diets, recipes } from '../../../data/recipes';
import { FaUser } from 'react-icons/fa';
import { GiCook, GiCookingPot } from 'react-icons/gi';
import Table from '../../../Components/Table';


function Dashboard() {
  const dashBoardData = [
    {
      bg:'bg-green-500',
      icon: GiCook,
      title: 'Total Recipes',
      total: recipes.length
    },{
      bg:'bg-orange-500',
      icon: GiCookingPot,
      title: 'Total Diets',
      total: diets.length
    },{
      bg:'bg-gray-500',
      icon: FaUser,
      title: 'Total Users',
      total: '0'
    },
  ]
  return (
    <SideBar>
      <div>
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-4'>
        {dashBoardData.map((item, i)=> (
          <div key={i} className='p-4 rounded bg-primary bg-opacity-50 border border-primary grid grid-cols-4 gap-2'>
            <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${item.bg}`}><item.icon className='text-3xl'/></div>
            <div className='col-span-3'>
              <h2>{item.title}</h2>
              <p className='font-semibold mt-2'>{item.total}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className='text-sm font-medium mt-6'>Recent Recipes</h3>
        <Table recipes={recipes} admin={true}/>
      </div>
      </div>
    </SideBar>
  )
}

export default Dashboard