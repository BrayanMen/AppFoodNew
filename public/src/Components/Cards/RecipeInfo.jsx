import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import FlexRecipeItems from "../FlexRecipeItems";
import { useState } from "react";

function RecipeInfo({ recipe }) {

    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);

    return (
        <div className="w-full h-fit relative text-black">
            <img src={recipe?.image} alt={recipe.name}
                className="w-full hidden xl:inline-block h-full object-cover filter blur-sm" />
            <div className=" bg-primary h-full flex-colo bg-opacity-40 xl:absolute top-0 left-0 right-0 bottom-0 ">
                <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo md:py-10 gap-8">
                    <div className="xl:col-span-1 w-full xl:order-none order-last xs:h-header h-64 bg-primary bg-opacity-60 border border-greenP rounded-lg overflow-hidden">
                        <img src={recipe?.image} alt={recipe.name} className="w-full h-full object-center" />
                    </div>
                    <div className="w-full col-span-2 md:grid grid-cols-5 gap-4 items-center">
                        <div className="xs:col-span-5 flex flex-col gap-10">
                            <h1 className="xs:text-4xl capitalize font-sans text-2xl font-bold">
                                {recipe?.name}
                            </h1>
                            <div className="flex items-center gap-4 bg-greenP rounded-md w-auto text-white py-1 px-2 font-bold">
                                <FlexRecipeItems recipe={recipe} />
                            </div>
                            <p className="bg-greenP bg-opacity-75 p-2 rounded-lg text-white text-sm leading-7" dangerouslySetInnerHTML={{ __html: recipe.summary }}>
                                {/*{recipe?.summary.replace(/<[^>]*>/g, '')}*/}
                            </p>
                            <Swiper
                                navigation={{ next, prev }}
                                slidesPerView={1}
                                spaceBetween={40}
                                autoplay={true}
                                speed={2000}
                                loop={true}
                                modules={[Navigation]}
                                className='w-full xl:h-auto justify-center py-6 bg-greenP rounded-lg text-white bg-opacity-75 lg:h-32 '>
                                {recipe.step_by_step.map((step, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="mx-6 px-6 py-2">
                                            <p className="items-center justify-center">
                                                <h2 className="font-bold">Step {i + 1}</h2>
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
}

export default RecipeInfo;