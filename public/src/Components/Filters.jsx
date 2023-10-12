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
        <div className="my-6 bg-primary text-black border-greenP grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded-full p-6 items-center">
            <div>
                <label htmlFor="dietSelect">Select Diet: </label>
                <select
                    id="dietSelect"
                    onChange={handleDietChange}
                    value={selectedDiet}
                >
                    <option value="all">All Diets</option>
                    {diets.map((diet) => (
                        <option key={diet._id} value={diet._id}>
                            {diet.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="sortOrder">Sort Order: </label>
                <select
                    id="sortOrder"
                    onChange={handleSortOrderChange}
                    value={sortOrder}
                >
                    <option value="all">No Filter</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
            </div>
            <div>
                <label>
                    Sort by Health Score:
                </label>
                <select
                    id="healthScore"
                    name="healthScore"
                    onChange={handleHealthScoreChange}
                    value={sortByHealthScore}
                >
                    <option value="all">No Filter</option>
                    <option value="max">Max</option>
                    <option value="min">Min</option>
                </select>
            </div>
            <div>
                <label>
                    Sort by Rating:
                </label>
                <select
                    id="rating"
                    name="rating"
                    onChange={handleRatingChange}
                    value={sortByRating}
                >
                    <option value="all">No Filter</option>
                    <option value="5">Max</option>
                    <option value="1">Min</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;