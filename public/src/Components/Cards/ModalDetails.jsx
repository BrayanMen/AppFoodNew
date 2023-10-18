import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';


function ModalDetails({ modalRecipe, onClose }) {
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);

    const { name, image, summary, health_score, step_by_step } = modalRecipe;
    return (
        <div className="fixed top-0 right-0 h-fit w-2/5">
            <div className="bg-white w-full h-full p-4 rounded-lg shadow-lg">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}>
                    Cerrar
                </button>
                <div className="flex">
                    {/* <div className="w-1/2 h-full">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div> */}
                    <div className="w-full p-4">
                        <h2 className="text-2xl font-semibold">{name}</h2>
                        <p 
                        className="bg-greenP bg-opacity-75 p-2 rounded-lg text-white text-sm leading-7" 
                        dangerouslySetInnerHTML={{ __html: summary }}>
                            </p>
                        <p>Health Score: {health_score}</p>
                        <h3>Steps:</h3>                        
                        <Swiper
                            navigation={{ next, prev }}
                            slidesPerView={1}
                            spaceBetween={40}
                            autoplay={true}
                            speed={2000}
                            loop={true}
                            modules={[Navigation]}
                            className='w-full xl:h-auto justify-center py-6 bg-greenP rounded-lg text-white bg-opacity-75 lg:h-32 '>
                            {step_by_step.map((step, i) => (
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
    )
}

export default ModalDetails