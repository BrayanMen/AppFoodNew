import SideBar from '../../../Screens/Dashboard/SideBar';
import Table2 from '../../../Components/Table2';

function Users() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-semibold">Users</h2>
        </div>
        <Table2 data={[]} users={true} />
      </div>
    </SideBar>
  )
}

export default Users