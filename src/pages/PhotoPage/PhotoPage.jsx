import { useParams } from "react-router-dom";
import FullSizePhoto from "../../components/FullSizePhoto/FullSizePhoto";

const PhotoPage = () => {
  const { id } = useParams();

  return <FullSizePhoto />;
};

export default PhotoPage;
