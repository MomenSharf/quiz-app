import { Input } from "@/components/ui/input";
import {  stockPhotos } from "@/lib/actions/image.actions";
import { Photo, UnsplashPhoto } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Gallery from "react-photo-gallery";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useEditorContext } from "../EditorContext";
import { Url } from "url";
import { Button } from "@/components/ui/button";
import { Filter } from "bad-words";

export default function StockPhotos() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [noMore, setNoMore] = useState(false);
  const page = useRef(2);
  const [isLoading, setIsLoading] = useState(false);
  const {
    dispatch,
    state: { currentQuestion },
  } = useEditorContext();
  console.log(photos);

  const filter = new Filter();

  const handleSearch = async () => {
    
    if (
      query === "" ||
      filter.isProfane(query) ||
      (!query.startsWith(process.env.MY_PASSWORD ? process.env.MY_PASSWORD : 'ff'))
    ) {
      return;
    }
    try {
      const newQuery = query.split('-').slice(1).join('-');
      console.log(newQuery);

      setIsLoading(true);
      const photos = await stockPhotos(query, "1");
      if (photos.length !== 0) {
        setIsLoading(false);
        setNoMore(false);

        setPhotos(photos);
      } else {
        setNoMore(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = async () => {
    console.log(page.current);

    if (query === "") return;
    try {
      setIsLoading(true);
      const photos = await stockPhotos(query, page.current.toString());
      if (photos.length !== 0) {
        page.current = page.current + 1;
        setPhotos((prev) => [...prev, ...photos]);
        setNoMore(false);
        setIsLoading(false);
      } else {
        setNoMore(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 1000);

  useEffect(() => {
    debouncedHandleSearch();
  }, [debouncedHandleSearch, query]);

  const handleOnClick = (url: string) => {
    dispatch({
      type: "SET_IS_QUESTION_IMAGE_MANAGER_TABS_OPEN",
      payload: false,
    });
    dispatch({
      type: "SET_IS_IMAGE_EDITOR_OPEN",
      payload: { isOpen: true, url },
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full pt-2">
      <Input
        placeholder="Search photos form Unsplash"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="overflow-y-auto max-h-full">
        <div>
          <Gallery
            photos={photos}
            onClick={(e, { photo }) => handleOnClick(photo.src)}
          />
        </div>
        {(query || photos.length !== 0) && (
          <div className="flex justify-center mt-3">
            {noMore ? (
              <span className="font-semibold">No Images</span>
            ) : (
              <Button onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? "lading..." : "load more"}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* )} */}
    </div>
  );
}
