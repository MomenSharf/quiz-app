"use server";
import axios from "axios";

export const fetchUnsplashImages = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  if (!ACCESS_KEY) {
    return {
      success: false,
      message: "Failed to fetch images from Unsplash.d",
    };
  }

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: query || "nature",
        per_page: 12,
        page
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });
    

    return {
      success: true,
      message: "Success loading photos",
      photos: response.data.results,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      success: false,
      message: "Failed to fetch images from Unsplash.",
      error,
    };
  }
};

export const fetchGiphyGIFs = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const API_KEY = process.env.GIPHY_API_KEY;

  if (!API_KEY) {
    return {
      success: false,
      message: "Failed to fetch GIFs from Giphy.",
    };
  }

  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: API_KEY,
        q: query || "funny", // Default query if none provided
        limit: 12, // Number of results per page
        offset: page * 12, // Offset for pagination
      },
    });

    return {
      success: true,
      message: "Success loading GIFs",
      gifs: response.data.data,
    };
  } catch (error: any) {
    console.error(error.message);

    return {
      success: false,
      message: "Failed to fetch GIFs from Giphy.",
      error,
    };
  }
};
