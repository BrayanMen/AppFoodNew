import { useState } from 'react';
import Filters from '../Components/Filters';
import Layout from '../Layouts/Layout';
import { recipes } from '../data/recipes';
import Card from '../Components/Cards/Card';
import Pagination from '../Components/Pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import FlexRecipeItems from '../Components/FlexRecipeItems';
import { Link } from 'react-router-dom';

function RecipesPage() {
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);


    const [filterOptions, setFilterOptions] = useState({
        diet: 'all',
        sortOrder: 'all',
        sortByHealthScore: 'all',
        sortByRating: 'all',
    });

    const [modalRecipe, setModalRecipe] = useState(null);

    const handleCardClick = (recipe) => {
        setModalRecipe(recipe);
    };

    const closeModal = () => {
        setModalRecipe(null);
    };

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
            <div>
                {modalRecipe ?
                    (<div className='z-0'>
                        <div className="md:w-full top-28 h-screen absolute text-black">
                            <img src={modalRecipe?.image} alt={modalRecipe.name}
                                className="w-full hidden xl:inline-block h-full z-0 " />
                            <div className=" bg-gray-400 h-full flex-colo bg-opacity-40 xl:absolute top-0 left-0 right-0 bottom-0 ">
                            </div>
                        </div>
                    </div>)
                    :
                    (null)
                }
            </div>
            <div className=' bg-greenP bg-opacity-40'>
                <div className="h-fit  items-center zIndex justify-center container mx-auto px-2 py-6">
                <Filters onFilterChange={handleFilterChange} filterOptions={filterOptions} />
                    <p className='text-lg font-medium my-6'>
                        Total: <span className='font-bold text-blueP'>{recipes?.length}</span>
                    </p>
                    <div className='md:flex md:w-1/2 xs:flex-col justify-center xs:items-center flex-wrap'>
                        <div className='flex sm:flex-row flex-col  w-full '>
                            {currentItems.map((recipe, index) => (
                                <Card key={index} recipe={recipe} handleCardClick={handleCardClick} />
                            ))}
                        </div>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={filteredRecipes.length} paginate={paginate} />
                    </div>
                    <div className="w-2/4 p-4">
                        {modalRecipe ? (
                            <div className="absolute top-24 items-center  right-0 h-fit md:w-2/4 w-full lg:z-0 z-50">
                                <div className="border border-greenP bg-gray-400 bg-opacity-50 backdrop-blur-sm gap-4 w-full h-full p-4 rounded-lg shadow-lg">
                                    <button
                                        className="absolute top-2 right-2 text-secondary hover:text-white bg-white hover:bg-secondary rounded-md px-2"
                                        onClick={closeModal}>
                                        Close
                                    </button>
                                    <Link to={`/recipe/${modalRecipe?.name}`}>
                                        <button
                                            className="absolute top-2 right-20 text-greenP hover:text-white bg-white hover:bg-yellow-400 rounded-md px-2"
                                        >
                                            Expand
                                        </button>
                                    </Link>
                                    <div className="flex">
                                        <div className="w-full p-4">
                                            <div>
                                                <h2 className="text-2xl font-semibold">{modalRecipe.name}</h2>
                                                <p className='flex-rows gap-4 bg-greenP rounded-md bg-opacity-75 my-1 text-white'>
                                                    <FlexRecipeItems recipe={modalRecipe} />
                                                </p>
                                            </div>
                                            <div className=' flex-colo items-center'>                                                
                                            <p
                                                className="bg-greenP bg-opacity-75 p-2 rounded-lg text-white text-sm leading-7"
                                                dangerouslySetInnerHTML={{ __html: modalRecipe.summary }}>
                                            </p>
                                            <h3 className='text-black font-bold text-xl'>Steps:</h3>
                                            <Swiper
                                                navigation={{ next, prev }}
                                                slidesPerView={1}
                                                spaceBetween={40}
                                                autoplay={true}
                                                speed={2000}
                                                loop={true}
                                                modules={[Navigation]}
                                                className='w-full xl:h-auto justify-center py-6 bg-greenP rounded-lg text-white bg-opacity-75 lg:h-32 '>
                                                {modalRecipe.step_by_step.map((step, i) => (
                                                    <SwiperSlide key={i}>
                                                        <div className="mx-6 px-6 py-2">
                                                            <p className="items-center justify-center">
                                                                <h2 className="font-bold text-xl">Step {i + 1}</h2>
                                                                {step}
                                                            </p>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                            :
                            (<div className='absolute top-1/2 items-center lg:block hidden  right-28 h-fit md:w-2/4 w-0'>
                                <div className='absolute top-24 items-center  right-0 h-fit md:w-2/4 w-0'>
                                <h1 className='text-3xl text-center p-4 border border-blueP bg-primary bg-opacity-50 hover:bg-greenP hover:text-white'>
                                    Select a recipe</h1>                                    
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RecipesPage;