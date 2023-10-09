import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <FullSizePhoto
      src={photo.urls.raw}
      alt={photo.alt_description}
      title={photo.alt_description}
    />
  );
};

export default PhotoPage;
