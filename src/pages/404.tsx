
const NotFound = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center">
          <a href="/" className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5 mb-8" aria-label="logo">
            TESTAPP
          </a>
          <p className="text-indigo-500 text-sm md:text-base font-semibold uppercase mb-4">That’s a 404</p>
          <h1 className="text-gray-800 text-2xl md:text-3xl font-bold text-center mb-2">Page not found</h1>

          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mb-12">The page you’re looking for doesn’t exist.</p>

          <a href="/" className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Go home</a>
        </div>
      </div>
    </div>
  )
}

export default NotFound;