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
              count: 10,
              // query: "cars",
            },
          }
        );
        setPhotos(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error(error);
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
    <>
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
    </>
  );
};

export default GalleryPage;
