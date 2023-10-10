import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Stack, Pagination } from "@mui/material";
import ThumbnailPhoto from "../../components/ThumbnailPhoto/ThumbnailPhoto";
import Preloader from "../../components/Preloader/Preloader";

const GalleryPage = () => {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("nature");
  const [searchQuery, setSearchQuery] = useState("nature");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(12);

  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePhotoSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            headers: {
              "Accept-Version": "v1",
              Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
            },
            params: {
              page: currentPage,
              per_page: photosPerPage,
              query: searchQuery,
            },
          }
        );
        setPhotos(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [currentPage, searchQuery]);

  return (
    <div className="mx-auto p-4 max-w-screen-xl my-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/">
          <h1 className="text-5xl font-extrabold text-indigo-600 tracking-wide mb-8">
            UnsplashView
          </h1>
        </Link>
        <form onSubmit={handlePhotoSearch} className="flex">
          <input
            type="search"
            defaultValue={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            Search
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded my-4">
          Error: Failed to fetch photos. Please try again later.
        </div>
      )}

      {loading && <Preloader />}

      <div className="grid grid-cols-3 gap-4">
        {photos &&
          photos.map((photo) => (
            <ThumbnailPhoto
              key={photo.id}
              id={photo.id}
              src={photo.urls.small}
              alt={photo.alt_description}
              title={photo.alt_description}
              authorName={photo.user.name}
            />
          ))}
      </div>

      {photos && (
        <div className="flex justify-center my-8">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleCurrentPageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
