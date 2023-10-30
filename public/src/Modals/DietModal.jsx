import React from 'react';
import MainModal from '../Modals/MainModal';
import { Input } from '../Components/UsedInputs';
import { HiPlusCircle } from 'react-icons/hi';

function DietModal({ modalOpen, setModalOpen, diet }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full max-w-md p-6 my-8 overflow-hidden text-left border border-primary bg-greenP rounded-md text-white">
        <h2 className="text-3xl font-semibold">
          {' '}
          {diet ? 'Update' : 'Create'}
        </h2>
        <form className=" flex flex-col gap-6 text-left mt-6">
          <Input
            label="Diet Name"
            placeholder={diet ? diet.name :"Diet ..."}
            type="text"
            bg={true}
          />
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="w-full py-2 flex-rows gap-2 border border-primary rounded-md bg-primary text-black font-semibold hover:text-secondary hover:bg-opacity-30"
          >
           {diet ? 'Udpate': (<><HiPlusCircle className="text-lg"/>Add</>)}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default DietModal;
