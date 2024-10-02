"use server";

import axios from "axios";
import { UnsplashPhoto } from "@/types";

export async function stockPhotos(query: string, page: string) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: query, per_page: 20, page },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data.results.map((photo: UnsplashPhoto) => ({
      src: photo.urls.small,
      width: (photo.width / 100) * 0.4,
      height: photo.height / 100,
      alt: photo.alt_description,
      key: crypto.randomUUID(),
    }));
  } catch (error) {
    console.error("Error fetching photos from Unsplash:", error);
  }
}
export async function giphyGIFs(query: string, page: string) {
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: process.env.GIPHY_API_KEY as string,
        q: query,
        limit: 10,
        offset: (parseInt(page) - 1) * 10,
      },
    });

    return response.data.data; // `data` contains the array of GIFs
  } catch (error) {
    console.error("Error fetching GIFs from Giphy:", error);
    return null; // Return null or handle the error as needed
  }
}


