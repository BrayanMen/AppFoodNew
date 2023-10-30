import React from 'react';
import SideBar from '../../Screens/Dashboard/SideBar';
import Uploader from '../../Components/Uploader';
import { Input } from '../../Components/UsedInputs';

function Profile() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Update Profile</h2>
        <Uploader />
        <Input
          label="Full Name"
          placeholder="Write your Name..."
          type="text"
          bg={true}
        />
        <Input
          label="Email"
          placeholder="mail@gmail.com..."
          type="email"
          bg={true}
        />
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button className="bg-secondary transitions   hover:bg-opacity-40 border border-secondary py-1.5 font-medium w-full sm:w-auto px-3 rounded">
            Delete Account
          </button>
          <button className="bg-primary transitions  text-black hover:text-white hover:bg-opacity-40 border border-primary py-1.5 font-medium w-full sm:w-auto px-3 rounded">
            Update Profile
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Profile;
