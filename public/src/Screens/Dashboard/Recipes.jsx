import React, { useState } from 'react';
import Filters from '../../Components/Filters';
import Layout from '../../Layouts/Layout';
import { recipes } from '../../data/recipes';
import { FaStar } from 'react-icons/fa';

function RecipesPage() {
    const [filterOptions, setFilterOptions] = useState({
        diet: 'all',
        sortOrder: 'asc',
        sortByHealthScore: 'all',
        sortByRating: '1', 
    });

    const applyFilters = (options) => {
        let filteredData = [...recipes];

        // Aplicar filtro por dieta
        if (options.diet !== 'all') {
            filteredData = filteredData.filter(recipe => recipe.diets.includes(options.diet));
        }

        // Aplicar filtro por orden alfabético
        if (options.sortOrder === 'asc') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (options.sortOrder === 'desc') {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Aplicar filtro por Health Score
        if (options.sortByHealthScore === 'min') {
            filteredData.sort((a, b) => a.health_score - b.health_score);
        } else if (options.sortByHealthScore === 'max') {
            filteredData.sort((a, b) => b.health_score - a.health_score);
        }

        // Aplicar filtro por Rating
        if (options.sortByRating === '1') {
            filteredData.sort((a, b) => a.reviews.rating - b.reviews.rating);
        } else if (options.sortByRating === '5') {
            filteredData.sort((a, b) => b.reviews.rating - a.reviews.rating);
        }

        setFilterOptions(options);
        return filteredData;
    };

    const handleFilterChange = (options) => {
        const filteredRecipes = applyFilters(options);
        setFilteredRecipes(filteredRecipes);
    };

    const [filteredRecipes, setFilteredRecipes] = useState(() => applyFilters(filterOptions));

    return (
        <Layout>
            <div className='min-h-screen container mx-auto px-2 py-6'>
                <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />
                {filteredRecipes.map((recipe, n) => (
                    <div key={recipe.name} className="">
                        <p>{n + 1}{' '}{recipe.name}</p>
                        <span>{recipe.health_score}%</span>
                        <br />
                        <span>{recipe.reviews.rating}</span><FaStar/>
                        <img src={recipe.image} alt={recipe.name} className='w-20 h-20' />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default RecipesPage;