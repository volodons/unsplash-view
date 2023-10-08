import { useState, useEffect } from "react";
import axios from "axios";
import ThumbnailPhoto from "../../components/ThumbnailPhoto/ThumbnailPhoto";

const GalleryPage = () => {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <>
      {photos &&
        photos.map((photo) => (
          <ThumbnailPhoto
            key={photo.id}
            id={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
            title={photo.alt_description}
          />
        ))}
    </>
  );
};

export default GalleryPage;
