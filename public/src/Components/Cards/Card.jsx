// import React, { useState } from 'react'
// import { FaHeart } from 'react-icons/fa'
// import ModalDetails from './ModalDetails';

// function Card({ recipe }) {
//     const [isOpen, setIsOpen] = useState(false)

//     const { name, image, health_score, diets } = recipe;

//     const toggleModal = () => {
//         setIsOpen(!isOpen)
//     }

//     const healthScoreColor = () => {
//         if (health_score >= 66) return 'bg-green-500';
//         if (health_score >= 33) return 'bg-yellow-500';
//         return 'bg-red-500';
//     };

//     return (
//         <div>
//             <img
//                 src={image}
//                 alt={name}
//                 className="w-full h-64 object-cover rounded-lg cursor-pointer"
//                 onClick={toggleModal}
//             />
//             {health_score && (
//                 <div
//                     className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white ${healthScoreColor()}`}
//                 >
//                     {health_score}% <FaHeart />
//                 </div>
//             )}
//             <div className="px-4 py-2">
//                 <h2 className="text-xl font-semibold">{name}</h2>
//                 <p>{diets}</p>
//             </div>
//             {isOpen && <ModalDetails recipe={recipe} toggleModal={toggleModal} />}
//         </div>
//     )
// }

// export default Card