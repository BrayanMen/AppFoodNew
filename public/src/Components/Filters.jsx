import { useState } from "react";
import { diets } from "../data/recipes";

function Filters({ onFilterChange }) {
    const [selectedDiet, setSelectedDiet] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortByHealthScore, setSortByHealthScore] = useState(false);
    const [sortByRating, setSortByRating] = useState(false);

    const handleDietChange = (event) => {
        const newDiet = event.target.value;
        setSelectedDiet(newDiet);
        applyFilters();
    };

    const handleSortOrderChange = (event) => {
        const newSortOrder = event.target.value;
        setSortOrder(newSortOrder);
        applyFilters();
    };

    const handleHealthScoreChange = (event) => {
        const newSortByHealthScore = event.target.checked;
        setSortByHealthScore(newSortByHealthScore);
        applyFilters();
    };

    const handleRatingChange = (event) => {
        const newSortByRating = event.target.checked;
        setSortByRating(newSortByRating);
        applyFilters();
    };

    const applyFilters = () => {
        // Construye un objeto con las opciones de filtro seleccionadas
        const filterOptions = {
            diet: selectedDiet,
            sortOrder,
            sortByHealthScore,
            sortByRating,
        };
        // Llama a la función proporcionada por onFilterChange con las opciones de filtro
        onFilterChange(filterOptions);
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
                    <option value="">All Diets</option>
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
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
            </div>
            <div>
                <label>
                    Sort by Health Score:
                    <input
                        type="checkbox"
                        checked={sortByHealthScore}
                        onChange={handleHealthScoreChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Sort by Rating:
                    <input
                        type="checkbox"
                        checked={sortByRating}
                        onChange={handleRatingChange}
                    />
                </label>
            </div>
        </div>
    );
}

export default Filters;