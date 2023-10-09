import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";
import FullSizePhoto from "../../components/FullSizePhoto/FullSizePhoto";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/${id}`,
          {
            headers: {
              "Accept-Version": "v1",
              Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
            },
            params: {
              client_id: import.meta.env.VITE_API_KEY,
            },
          }
        );
        setPhoto(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className="relative">
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center text-6xl text-white hover:text-gray-300 hover:underline transition duration-300"
      >
        &#x2190; Back
      </Link>
      <FullSizePhoto
        src={photo.urls.raw}
        alt={photo.alt_description}
        title={photo.alt_description}
      />
    </div>
  );
};

export default PhotoPage;
