import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPhoto } from "../../api/api";
import Preloader from "../../components/common/Preloader/Preloader";
import FullSizePhoto from "../../components/FullSizePhoto/FullSizePhoto";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPhoto(id);
        setPhoto(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
