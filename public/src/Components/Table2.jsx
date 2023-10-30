import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Head = 'text-xs text-center font-semibold px-4 py-2 uppercase';
const Text =
  'text-sm text-center leading-6  whitespace-nowrap px-4 py-3 uppercase';

const Rows = (data, i, users, editDiet) => {
  return (
    <tr key={i}>
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-black border border-primary h-12 rounded overflow-hidden">
              <img
                src={data.image}
                alt={data.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          </td>
          <td className={`${Text}`}>{data._id}</td>
          <td className={`${Text}`}>{data.fullName}</td>
          <td className={`${Text}`}>
            {data.createAt ? data.createAt : '12, Oct 2023'}
          </td>
          <td className={`${Text}`}>{recipe.email}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button className="font-medium transitions hover:bg-secondary border border-secondary py-1.5 px-3 rounded">
              <MdDelete className="w-6 h-4" />
            </button>
          </td>
        </>
      ) : (
        <>
          <td className={`${Text}`}>{data._id}</td>
          <td className={`${Text}`}>{data.name}</td>
          <td className={`${Text}`}>
            {data.createAt ? data.createAt : '12, Oct 2023'}
          </td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button
              onClick={() => editDiet(data)}
              className="font-medium text-xs transitions flex-rows gap-1 hover:bg-green-500 border border-primary py-1.5  px-3 rounded"
            >
              Edit
              <FaEdit className="text-white" />
            </button>
            <button className="font-medium transitions hover:bg-secondary border border-secondary py-1.5 px-3 rounded">
              <MdDelete className="w-6 h-4" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

function Table2({ data, users, editDiet }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-primary divide-y divide-primary">
        <thead>
          <tr className="bg-gray-700">
            {users ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Image
                </th>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  FullName
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Name
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
              </>
            )}
            <th scope="col" className={`${Head}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-500 bg-opacity-50 divide-y divide-primary">
          {data?.map((data, i) => Rows(data, i, users, editDiet))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
