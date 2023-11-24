import { useState, useEffect } from 'react';
import { diets } from '../data/recipes';


function Filters({ onFilterChange, filterOptions }) {
    const [selectedDiet, setSelectedDiet] = useState(filterOptions.diet);
    const [sortOrder, setSortOrder] = useState(filterOptions.sortOrder);
    const [sortByHealthScore, setSortByHealthScore] = useState(filterOptions.sortByHealthScore);
    const [sortByRating, setSortByRating] = useState(filterOptions.sortByRating);

    useEffect(() => {
        applyFilters();
    }, [selectedDiet, sortOrder, sortByHealthScore, sortByRating]);

    const handleDietChange = (event) => {
        const newDiet = event.target.value;
        setSelectedDiet(newDiet);
    };

    const handleSortOrderChange = (event) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
    };

    const handleHealthScoreChange = (event) => {
        const newSortByHealthScore = event.target.value;
        setSortByHealthScore(newSortByHealthScore);
    };

    const handleRatingChange = (event) => {
        const newSortByRating = event.target.value;
        setSortByRating(newSortByRating);
    };

    const applyFilters = () => {
        const options = {
            diet: selectedDiet,
            sortOrder,
            sortByHealthScore,
            sortByRating,
        };

        onFilterChange(options);
    };

    return (
        <div className="my-6 bg-primary bg-opacity-50 backdrop-blur-sm text-black border-greenP grid md:grid-cols-4 grid-cols-2 lg:gap-6 gap-2 sm:rounded-full rounded-2xl p-6 ">
            <div >
                <select
                    id="dietSelect"
                    onChange={handleDietChange}
                    value={selectedDiet}
                    className='relative border  border-primary w-full text-white bg-greenP rounded-lg cursor-default py-3 pl-6 pr-10 text-left text-xs '
                >
                    <option value="all" 
                        className='absolute z-10 mt-1 max-h-60 w-full text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        All Diets
                    </option>
                    {diets.map((diet) => (
                        <option key={diet._id} value={diet._id}
                            className=' z-10 mt-1 max-h-60 w-full text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                            {diet.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    id="sortOrder"
                    onChange={handleSortOrderChange}
                    value={sortOrder}
                    className='relative border border-primary w-full  text-white bg-greenP rounded-lg cursor-default py-3 pl-6 pr-10 text-left text-xs '
                >
                    <option value="all" disabled>Sort Order: </option>
                    <option value="all"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>No Filter</option>
                    <option value="asc"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>A - Z</option>
                    <option value="desc"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>Z - A</option>
                </select>
            </div>
            <div>
                <select
                    id="healthScore"
                    name="healthScore"
                    onChange={handleHealthScoreChange}
                    value={sortByHealthScore}
                    className='relative border border-primary w-full text-white bg-greenP rounded-lg cursor-default py-3 pl-6 pr-10 text-left text-xs '
                >
                    <option value="all" disabled>Health Score: </option>
                    <option value="all"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>No Filter</option>
                    <option value="max"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>Max</option>
                    <option value="min"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>Min</option>
                </select>
            </div>
            <div>
                <select
                    id="rating"
                    name="rating"
                    onChange={handleRatingChange}
                    value={sortByRating}
                    className='relative border border-primary w-full text-white bg-greenP rounded-lg cursor-default py-3 pl-6 pr-10 text-left text-xs '
                >
                    <option value="all" disabled>Score: </option>
                    <option value="all"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>No Filter</option>
                    <option value="5"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>Max</option>
                    <option value="1"
                    className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>Min</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;