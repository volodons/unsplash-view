import axios from "axios";

export const fetchPhoto = async (id) => {
  const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
    },
  });

  return response.data;
};

export const searchPhotos = async (currentPage, photosPerPage, searchQuery) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
    },
    params: {
      page: currentPage,
      per_page: photosPerPage,
      query: searchQuery,
    },
  });

  return response.data;
};
