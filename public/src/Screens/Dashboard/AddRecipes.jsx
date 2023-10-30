import { useState } from 'react';
import { Input, Message } from '../../Components/UsedInputs';
import SideBar from '../../Screens/Dashboard/SideBar';
import { diets } from '../../data/recipes';
import Uploader from '../../Components/Uploader';

function AddRecipes() {
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [recipe, setRecipe] = useState({
    name: '',
    health_score: '',
    image: '',
    summary: '',
    step_by_step: [],
    diets: [],
  });

  const handleSelectDiet = (e) => {
    if (!selectedDiet.includes(e.target.value))
      setSelectedDiet([...selectedDiet, e.target.value]);
  };

  const handleDeleteDiet = (e) => {
    e.preventDefault();
    setSelectedDiet(selectedDiet.filter((d) => d !== e.target.value));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addStep = () => {
    setRecipe({ ...recipe, step_by_step: [...recipe.step_by_step, ''] });
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipe.step_by_step];
    updatedSteps[index] = value;
    setRecipe({ ...recipe, step_by_step: updatedSteps });
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Create Recipe</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Name" placeholder="Name..." type="text" bg={true} />
          <Input
            label="Health Score (1-100)"
            placeholder="Health Score..."
            type="text"
            bg={true}
          />
        </div>
        <Message
          label="Summary"
          placeholder="Summary..."
          type="text"
          bg={true}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Image</p>
            <Uploader />
          </div>

          <div>
            <label className="font-semibold">Diets</label>
            <select
              className="relative border border-primary w-full text-white bg-greenP rounded-lg cursor-default py-2 pl-6 mt-2 pr-10 text-left text-sm "
              onChange={handleSelectDiet}
              defaultValue="DEFAULT"
            >
              <option
                className=" z-10 mt-2 max-h-60 w-full  text-white ring-1 ring-white ring-opacity-5 overflow-auto focus:outline-none text-sm"
                value="DEFAULT"
                disabled
              >
                Select Diet
              </option>
              {diets.map((diet) => (
                <option value={diet.name} key={diet.id}>
                  {diet.name}
                </option>
              ))}
            </select>
            <div className="">
              <ul className="border border-primary px-14 py-3 bg-gray-500 bg-opacity-40 rounded-lg mt-2 mx-2 text-sm flex flex-wrap items-center justify-center gap-2 ">
                {selectedDiet.map((diet, id) => (
                  <li className="underline underline-offset-4" key={id}>
                    {diet}
                    <button
                      className="m-2 bg-secondary text-xs px-2 py-1 border border-secondary hover:bg-opacity-40 rounded-md"
                      value={diet}
                      onClick={handleDeleteDiet}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ul>
          <label className="font-semibold">Step by Step</label>
          {recipe.step_by_step.map((step, index) => (
            <li key={index}>
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className={`w-full text-sm mt-2 p-3 border border-primary text-white bg-green-900 bg-opacity-50 rounded`}
              />
            </li>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="bg-blueP md:ml-5 text-black transitions hover:text-white hover:bg-opacity-40 border border-blueP mt-2 py-1.5 font-medium w-full sm:w-auto px-3 rounded"
          >
            Add Step
          </button>
        </ul>

        <div className="flex justify-end items-center my-4">
          <button className="bg-primary transitions text-black hover:text-white hover:bg-opacity-40 border border-primary py-1.5 font-medium w-full sm:w-auto px-3 rounded">
            Create recipe
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default AddRecipes;
