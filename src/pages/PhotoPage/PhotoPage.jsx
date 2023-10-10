import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";
import FullSizePhoto from "../../components/FullSizePhoto/FullSizePhoto";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}`,
          {
            headers: {
              "Accept-Version": "v1",
              Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        setPhoto(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  return (
    <div className="relative">
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center text-6xl text-white hover:text-gray-300 hover:underline transition duration-300"
      >
        &#x2190; Back
      </Link>

      {loading && <Preloader />}

      {error && (
        <div className="bg-red-500 text-white p-4 fixed top-0 left-0 w-full text-center">
          {error.response ? (
            <p>Photo not found. Please try another photo.</p>
          ) : (
            <p>Network error. Please check your internet connection.</p>
          )}
        </div>
      )}

      {photo && (
        <FullSizePhoto
          src={photo.urls.raw}
          alt={photo.alt_description}
          title={photo.alt_description}
        />
      )}
    </div>
  );
};

export default PhotoPage;
