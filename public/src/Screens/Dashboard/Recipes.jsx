import { useState } from 'react';
import Filters from '../../Components/Filters';
import Layout from '../../Layouts/Layout';
import { recipes } from '../../data/recipes';

function RecipesPage() {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const applyFilters = (filterOptions) => {
        // Copia la receta original para evitar modificar los datos originales
        let filteredData = [...recipes];

        // Aplicar filtro por dieta
        if (filterOptions.diet) {
            filteredData = filteredData.filter(recipe => recipe.diets.includes(filterOptions.diet));
        }

        // Aplicar filtro por orden alfabético
        if (filterOptions.sortOrder === "asc") {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filterOptions.sortOrder === "desc") {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Aplicar filtro por Health Score
        if (filterOptions.sortByHealthScore) {
            filteredData.sort((a, b) => a.health_score - b.health_score);
        }

        // Aplicar filtro por Rating
        if (filterOptions.sortByRating) {
            filteredData.sort((a, b) => b.reviews.rating - a.reviews.rating);
        }

        setFilteredRecipes(filteredData);
    };

    return (
        <Layout>
            <div className='min-height-screen container mx-auto px-2 py-6'>
                <Filters onFilterChange={applyFilters} />
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.name} className="recipe-card">
                        <img src={recipe.image} alt="" />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default RecipesPage;