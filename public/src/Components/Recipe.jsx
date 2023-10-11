import { FaHeart } from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Recipe({ recipe }) {
    return (
        <>
            <div className='border border-gray-500 p-1 hover:scale-105 transitions relative rounded overflow-hidden '>
                <Link to={`/recipe/${recipe?.name}`}
                className='w-full'>
                    <img src={recipe?.image} alt={recipe?.name} className='w-full h-96 object-cover'/>
                </Link>
                <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-greenP bg-opacity-60 text-white px-4 py-3'>
                    <h3 className='font-semibold truncate'>
                        {recipe?.name}
                    </h3>
                    <button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-secondary rounded-md bg-secondary text-white'>
                        <FaHeart/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Recipe