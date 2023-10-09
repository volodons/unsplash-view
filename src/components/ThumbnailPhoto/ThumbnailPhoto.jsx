import { Link } from "react-router-dom";

const ThumbnailPhoto = ({ id, src, alt, title, authorName }) => {
  return (
    <div>
      <Link to={id}>
        <img id={id} src={src} alt={alt} title={title} />
      </Link>
      <p>{title}</p>
      <p>{authorName}</p>
    </div>
  );
};

export default ThumbnailPhoto;
