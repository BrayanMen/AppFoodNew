import React, { useEffect, useState } from 'react';
import { diets } from '../../data/recipes';
import SideBar from '../../Screens/Dashboard/SideBar';
import { HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../Components/Table2';
import DietModal from '../../Modals/DietModal';

function Diets() {
  const [modalOpen, setModalOpen] = useState(false);
  const [diet, setDiet] = useState('')

const editDiet = (id) =>{
  setDiet(id);
  setModalOpen(!modalOpen)
}
useEffect(()=>{
  if(modalOpen === false){
    setDiet()
  }
}, [modalOpen])

  return (
    <SideBar>
      <DietModal modalOpen={modalOpen} setModalOpen={setModalOpen} diet={diet} />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-semibold">Diets</h2>
          <button
            onClick={() =>{setModalOpen(true)}}
            className="font-medium transitions hover:text-black hover:bg-primary border border-primary py-1.5 flex-rows gap-1 px-3 rounded"
          >
            Create <HiPlusCircle className="text-xl" />
          </button>
        </div>
        <Table2 data={diets} users={false} editDiet={editDiet} />
      </div>
    </SideBar>
  );
}

export default Diets;
