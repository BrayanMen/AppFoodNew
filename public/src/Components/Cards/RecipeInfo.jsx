import { diets } from "../../data/recipes";
import FlexRecipeItems from "../FlexRecipeItems";

function RecipeInfo({ recipe }) {
    const dietNames = recipe.diets.map((dietId) => {
        const matchingDiet = diets.find((d) => d._id === dietId)
        return matchingDiet ? matchingDiet.name : 'Desconocida';
    })

    return (
        <div className="w-full xl:h-screen relative text-black">
            <img src={recipe?.image} alt={recipe.name}
                className="w-full hidden xl:inline-block h-full object-cover filter blur-sm" />
            <div className="xl:bg-greeP bg-primary flex-colo xl:bg-opacity-40 xl:absolute top-0 left-0 right-0 bottom-0 ">
                <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-10 gap-8">
                    <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-primary bg-opacity-60 border border-greenP rounded-lg overflow-hidden">
                        <img src={recipe?.image} alt={recipe.name} className="w-full h-full object-center" />
                    </div>
                    <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-3 flex flex-col gap-10">
                            <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                                {recipe?.name}
                            </h1>
                        <div className="flex items-center gap-4 bg-greenP text-white py-1 px-2 font-medium">
                        <FlexRecipeItems recipe={recipe}/>   
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeInfo;