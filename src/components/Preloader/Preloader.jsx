const Preloader = () => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-75 z-50">
    <div className="inline-block h-24 w-24 animate-spin rounded-full border-8 border-solid border-white border-r-transparent align-middle">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Preloader;
