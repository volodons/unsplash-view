import { Link } from "react-router-dom";

const ThumbnailPhoto = ({ id, src, alt, title, authorName }) => {
  return (
    <Link to={id} className="block relative aspect-w-16 aspect-h-9">
      <div className="border border-gray-300 shadow-md p-4 rounded-md mb-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-blue-500 hover:ring-4 ring-blue-100">
        <img
          className="object-cover w-full h-full rounded-md mb-2"
          id={id}
          src={src}
          alt={alt}
          title={title}
        />
        <p className="text-lg font-semibold mb-1">{title}</p>
        <p className="text-gray-600">{authorName}</p>
      </div>
    </Link>
  );
};

export default ThumbnailPhoto;
