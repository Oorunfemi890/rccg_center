import { Link } from 'react-router-dom';

const Ministry = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800 flex justify-center items-center min-h-screen text-center px-5">
      <div className="max-w-2xl">
        <h1 className="text-8xl text-red-500 font-bold">404</h1>
        <h2 className="my-3 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-5 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-block py-3 px-5 no-underline bg-slate-800 text-white rounded-md hover:bg-slate-600 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Ministry;