import React from 'react'
import SideBar from '../../Screens/Dashboard/SideBar'
import { Input } from '../../Components/UsedInputs'

function Password() {
  return (
    <div>
      <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <Input
          label="Previous Password"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="New Password"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          type="password"
          bg={true}
        />
        <div className="flex justify-end items-center my-4">
          <button className="bg-primary transitions text-black hover:text-white hover:bg-opacity-40 border border-primary py-1.5 font-semibold w-full sm:w-auto px-3 rounded">
            Change Password
          </button>
        </div>
      </div>
    </SideBar>
    </div>
  )
}

export default Password