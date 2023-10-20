import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { Message, Select } from '../UsedInputs'
import { useState } from 'react'
import Rating from '../Stars'

function RecipeRate({ recipe }) {
    const [rating, setRating] = useState()
    const Ratings = [
        {
            title: "0 - Inedible",
            value: 0
        },
        {
            title: "1 - Not Very Edible",
            value: 1
        },
        {
            title: "2 - Something Edible",
            value: 2
        },
        {
            title: "0 - Tasty",
            value: 3
        },
        {
            title: "0 - Delicious",
            value: 4
        },
        {
            title: "5 - Very Delicious",
            value: 5
        },
    ]
    return (
        <div className='my-12'>
            <Titles title='Reviews' Icon={BsBookmarkStarFill} />
            <div className='mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-gray-500 xs:p-10 py-10 px-2 sm:p-20 rounded'>
                <div className='xl:col-span-2 w-full flex flex-col gap-8'>
                    <h3 className='text-xl text-black font-semibold'>
                        Review "{recipe?.name}"
                    </h3>
                    <p className='text-sm leading-7 font-medium text-gray-800  '>
                        Write a review for this recipe.
                    </p>
                    <div className='text-sm w-full'>
                        <Select
                            label='Select Rating'
                            options={Ratings}
                            onChange={(e) => setRating(e.target.value)} />
                        <div className='text-yellow-500 mt-4 flex gap-2 text-lg'>
                            <Rating value={rating} />
                        </div>
                    </div>
                    <Message label={'Message'} placeholder={'Write about the recipe...'}/>
                    <button className='bg-secondary font-semibold hover:bg-red-700 text-white py-3 hover:text-white flex-colo rounded'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeRate