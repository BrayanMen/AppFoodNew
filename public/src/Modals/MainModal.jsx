import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { IoMdClose } from 'react-icons/io';


function MainModal({modalOpen, setModalOpen, children}){
  const closeButtonRef = useRef();
  return(
    <>
    <Transition show={modalOpen} as={Fragment} appear>
      <Dialog 
      as='div' 
      initialFocus={closeButtonRef} 
      onClose={()=> setModalOpen(false)} 
      className='fixed inset-0 z-30 overflow-y-auto text-center'>
        <div className='min-h-screem px-4'>
          <Transition.Child as={Fragment} 
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-greenP bg-opacity-50'/>
          </Transition.Child>
           <span className='inline-block h-screen align-middle' aria-hidden='true'>&#8203</span>
           <Transition.Child as={Fragment} 
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'>
           {children}
          </Transition.Child>
          <div className='absolute top-5 right-5'>
            <button 
            onClick={() => setModalOpen(false)} 
            type='button'
            className='w-10 h-10 text-base text-white bg-secondary border border-transparent rounded-full flex-colo hover:bg-white hover:text-secondary'>
              <IoMdClose/>
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  )
}

export default MainModal;