// import React from 'react'

// function ModalDetails({recipe, toggleModal}) {
//     const { name, image, summary, health_score, step_by_step } = recipe;
//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
//     <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
//       <button
//         className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//         onClick={toggleModal}
//       >
//         Cerrar
//       </button>
//       <div className="flex">
//         <div className="w-1/2">
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-64 object-cover rounded-lg"
//           />
//         </div>
//         <div className="w-1/2 p-4">
//           <h2 className="text-2xl font-semibold">{name}</h2>
//           <p>{summary}</p>
//           <p>Health Score: {health_score}</p>
//           <h3>Ingredientes:</h3>
//           <ul>
//             {step_by_step.map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default ModalDetails