import React, { useState } from 'react';
import Filters from '../Components/Filters';
import Layout from '../Layouts/Layout';
import { recipes } from '../data/recipes';
import { FaHeart, FaStar } from 'react-icons/fa';
import Card from '../Components/Cards/Card';
import Pagination from '../Components/Pagination';

function RecipesPage() {
    const [filterOptions, setFilterOptions] = useState({
        diet: 'all',
        sortOrder: 'all',
        sortByHealthScore: 'all',
        sortByRating: 'all',
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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Layout>
            <div className="min-h-screen items-center justify-center container mx-auto px-2 py-6">
                <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />
                <p className='text-lg font-medium my-6'>
                    Total: <span className='font-bold text-blueP'>{recipes?.length}</span>
                </p>
                <div className='md:flex md:w-3/5 xs:flex-col justify-center flex-wrap'>
                    <div className='flex sm:flex-row flex-col  w-full '>
                    {currentItems.map((recipe, index) => (
                        <Card key={index} recipe={recipe} />
                        ))}
                </div>
                    <Pagination itemsPerPage={itemsPerPage} totalItems={filteredRecipes.length} paginate={paginate} />
                        </div>
            </div>
        </Layout>
    )
}

export default RecipesPage;