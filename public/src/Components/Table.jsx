import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GoEye } from 'react-icons/go';
import { diets } from '../data/recipes';
import { Link } from 'react-router-dom';

const Head = 'text-xs text-center font-semibold px-4 py-2 uppercase';
const Text =
  'text-sm text-center leading-6  whitespace-nowrap px-4 py-3 uppercase';

const Rows = (recipe, i, admin) => {
  const dietNames = recipe.diets.map((dietId) => {
    const matchingDiet = diets.find((d) => d._id === dietId);
    return matchingDiet ? matchingDiet.name : 'Desconocida';
  });

  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-black border border-primary h-12 rounded overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{recipe.name}</td>
      <td className={`${Text}`}>{dietNames[0]}</td>
      <td className={`${Text}`}>{recipe.health_score}%</td>
      <td className={`${Text}`}>{recipe.reviews.rating}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button className="font-medium text-xs transitions flex-rows gap-1 hover:bg-green-500 border border-primary py-1.5  px-3 rounded">
              Edit
              <FaEdit className="text-white" />
            </button>
            <button className="font-medium transitions hover:bg-secondary border border-secondary py-1.5 px-3 rounded">
              <MdDelete className="w-6 h-4" />
            </button>
          </>
        ) : (
          <>
            <button className="font-medium text-xs transitions flex-rows gap-1 hover:bg-green-500 border border-primary py-1.5  px-3 rounded">
              Edit
              <FaEdit className="text-white" />
            </button>
            <Link
              to={`/recipe/${recipe?.name}`}
              className="font-medium transitions hover:bg-secondary border border-secondary py-1.5 px-3 rounded"
            >
              <GoEye className="w-6 h-4" />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

function Table({ recipes, admin }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-primary divide-y divide-primary">
        <thead>
          <tr className="bg-gray-700">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Diets
            </th>
            <th scope="col" className={`${Head}`}>
              Healt Score
            </th>
            <th scope="col" className={`${Head}`}>
              Rating
            </th>
            <th scope="col" className={`${Head}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-500 bg-opacity-50 divide-y divide-primary">
          {recipes?.map((recipe, i) => Rows(recipe, i, admin))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
