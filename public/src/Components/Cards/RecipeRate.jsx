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
                    <h3 className='text-2xl text-black font-semibold'>
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
                    <Message label={'Message'} placeholder={'Write about the recipe...'} />
                    <button className='bg-secondary font-semibold hover:bg-red-700 text-white py-3 hover:text-white flex-colo rounded'>
                        Submit
                    </button>
                </div>
                <div className='col-span-3 flex flex-col gap-6'>
                    <h3 className='text-2xl text-black font-semibold'>Review (56)</h3>
                    <div className='w-full flex flex-col bg-greenP gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll'>
                        {/*Cards Reviews*/}
                        <div className='md:grid flex flex-col w-full grid-cols-12 gap-6 bg-primary bg-opacity-50 p-4 border border-green-800 rounded-lg'>
                            <div className='col-span-2 hidden md:block'>
                                <img
                                    src={`https://dthezntil550i.cloudfront.net/f4/latest/f41908291942413280009640715/1280_960/1b2d9510-d66d-43a2-971a-cfcbb600e7fe.png`}
                                    alt={'user.fullnName'} className='w-full h-24 rounded-lg object-cover' />
                            </div>
                            <div className='col-span-7 flex flex-col gap-2'>
                                <h2 className='text-xl font-bold'>user.Fullname</h2>
                                <p className='text-sm leading-6 font-medium text-white'>
                                    jaljahdljhaldhaldadhaldñajdñañsdj
                                </p>
                            </div>
                            <div className='col-span-3 flex-rows border-l border-greenP text-md gap-1 text-yellow-500'>
                                <Rating value={3}/>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeRate