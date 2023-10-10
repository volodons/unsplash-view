import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Stack, Pagination } from "@mui/material";
import ThumbnailPhoto from "../../components/ThumbnailPhoto/ThumbnailPhoto";
import Preloader from "../../components/Preloader/Preloader";
// import { useLocation, useHistory } from "react-router-dom";

const GalleryPage = () => {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(12);

  // const location = useLocation();
  // const history = useHistory();
  // const queryParams = new URLSearchParams(location.search);
  // const currentPage = parseInt(queryParams.get("page")) || 1;

  // const handleCurrentPageChange = (event, value) => {
  //   setCurrentPage(value);
  //   queryParams.set("page", value);
  //   history.push(`/gallery?${queryParams.toString()}`);
  // };

  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
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
              // query: "cars",
            },
          }
        );
        setPhotos(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [currentPage]);

  // const handleSearchQueryChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handlePhotoSearch = (e) => {
  //   e.preventDefault();
  //   fetchPhotos();
  // };

  return (
    <div className="mx-auto p-4 max-w-screen-xl my-8">
      <div>
        <Link to="/">
          <h1 className="flex items-center text-3xl font-extrabold text-indigo-600">
            UnsplashView
          </h1>
        </Link>
        {/* <form onSubmit={handlePhotoSearch}>
          <input type="search" onChange={handleSearchQueryChange} />
          <button onClick={handlePhotoSearch}></button>
        </form> */}
      </div>
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
