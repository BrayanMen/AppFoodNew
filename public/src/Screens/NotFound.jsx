import { Link } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import { FaHome } from 'react-icons/fa'


function NotFound() {
  return (
    <Layout>
      <div>
        <div className="flex-colo gap-8 w-full min-h-screen text-black bg-white lg:py-20 py-10 px-6">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt=""
            className=" absolute top-6 z-0 w-full h-96 object-contain"
          />
          <br/>
          <br/>
          <h1 className="lg:text-4xl z-10 text-2xl font-bold">Page Not Found</h1>
          <h1 className=" z-10 bottom-0 lg:text-4xl text-2xl font-bold">404</h1>
          <p className='font-semibold text-lg italic leading-6'>The page you are looking for does not exist. You may have mistyped the URL.</p>
          <Link to='/' className='bg-secondary hover:bg-greenP flex-rows gap-2 font-medium px-2 py-1 rounded-lg text-white'><FaHome/>Home</Link>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
