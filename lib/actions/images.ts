"use server";
import { UnsplashImage } from "@/types";
import axios from "axios";

export const fetchUnsplashImages = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  const MY_PASSWORD = process.env.MY_PASSWORD;

  if (!ACCESS_KEY) {
    return {
      success: false,
      message: "Failed to fetch images from Unsplash.d",
    };
  }

  if (!MY_PASSWORD) {
    return {
      success: false,
      message:
        "Failed to authenticate with Unsplash. Please write first the password",
    };
  }

  const regex = new RegExp(`^${MY_PASSWORD}(\\w+)`); // Create regex dynamically
  const match = query.match(regex);

  if (!match) {
    return {
      success: false,
      message: "Password not matching",
    };
  }

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: match[1] || "nature",
        per_page: 12,
        page,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    return {
      success: true,
      message: "Success loading photos",
      photos: response.data.results as UnsplashImage[],
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
  const MY_PASSWORD = process.env.MY_PASSWORD;

  if (!API_KEY) {
    return {
      success: false,
      message: "Failed to fetch GIFs from Giphy.",
    };
  }

  if (!MY_PASSWORD) {
    return {
      success: false,
      message:
        "Failed to authenticate with Unsplash. Please write first the password",
    };
  }

  const regex = new RegExp(`^${MY_PASSWORD}(\\w+)`); // Create regex dynamically
  const match = query.match(regex);

  if (!match) {
    return {
      success: false,
      message: "Password not matching",
    };
  }
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: API_KEY,
        q: match[1] || "funny", // Default query if none provided
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
