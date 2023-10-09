import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ThumbnailPhoto from "../../components/ThumbnailPhoto/ThumbnailPhoto";
import Preloader from "../../components/Preloader/Preloader";

const GalleryPage = () => {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: import.meta.env.VITE_API_KEY,
              count: 20,
              // query: "cars",
            },
            headers: {
              "Accept-Version": "v1",
            },
          }
        );
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // const handleSearchQueryChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handlePhotoSearch = (e) => {
  //   e.preventDefault();
  //   fetchPhotos();
  // };

  return (
    <div className="mx-auto p-4 max-w-screen-xl my-8">
      {/* <div>
        <Link to="/">
          <h1>UnsplashView</h1>
        </Link>
        <form onSubmit={handlePhotoSearch}>
          <input type="search" onChange={handleSearchQueryChange} />
          <button onClick={handlePhotoSearch}></button>
        </form>
      </div> */}
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
    </div>
  );
};

export default GalleryPage;
