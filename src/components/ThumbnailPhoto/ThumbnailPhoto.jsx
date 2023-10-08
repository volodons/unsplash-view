import { Link } from "react-router-dom";

const ThumbnailPhoto = ({ id, src, alt, title }) => {
  return (
    <Link to={id}>
      <img id={id} src={src} alt={alt} title={title}></img>
    </Link>
  );
};

export default ThumbnailPhoto;
