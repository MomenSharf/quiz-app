import { fetchUnsplashImages } from "@/lib/actions/images";
import { ImageManagerTabsType, UnsplashImage } from "@/types";
import { useInView } from "framer-motion";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
// import Gallery from "react-photo-gallery";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import Image from "next/image";
import Loader from "../Layout/Loader";
import { Icons } from "../icons";
import { Gallery } from "react-grid-gallery";

export default function StockPhotos({
  onSelectImage,
  query,
  setQuery
}: {
  onSelectImage: ({
    acceptedFiles,
    from,
  }: {
    acceptedFiles: File[] | string;
    from: ImageManagerTabsType;

  }) => void;
  query: string, setQuery: Dispatch<SetStateAction<string>>
}) {
  // const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<
    {
      src: string;
      width: number;
      height: number;
      alt?: string;
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const searcInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref);

  const fetchPhotos = useCallback(
    async (searchQuery: string, currentPage: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const {
          success,
          message,
          photos: newPhotos,
        } = await fetchUnsplashImages({
          query: searchQuery || "wanderlust",
          page: currentPage,
        });

        if (success && newPhotos) {
          const formattedPhotos = newPhotos.map((image, index) => {
            return {
              src: image.urls.regular,
              width: image.width / 10, // Adjusted for display
              height: image.height / 10, // Adjusted for display
              alt: image.alt_description,
            };
          });
          setPhotos((prev) =>
            currentPage === 1 ? formattedPhotos : [...prev, ...formattedPhotos]
          );
          setHasMore(newPhotos.length === 12); // Assume 12 is the page size
        } else {
          toast({ description: message, variant: "destructive" });
        }
      } catch (error) {
        toast({
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  const handleSearch = useCallback(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    if (query.trim()) {
      fetchPhotos(query, 1);
    }
  }, [query, fetchPhotos]);

  useEffect(() => {
    if (inView && hasMore && !loading && query.trim() && photos.length >= 12) {
      fetchPhotos(query, page + 1);
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading, query, page, fetchPhotos, photos.length]);

  useEffect(() => {
    setTimeout(() => {
      if (searcInputRef.current) {
        searcInputRef.current.focus();
      }
    }, 10);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex w-full">
        <Input
          placeholder="Search for photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-tr-none rounded-br-none border-r-0"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (query) {
                handleSearch();
              }
            }
          }}
          ref={searcInputRef}
        />
        <Button
          variant="outline"
          size="icon"
          className="rounded-tl-none rounded-bl-none"
          onClick={handleSearch}
          disabled={loading}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Photos Grid */}
      <div className="flex-1 max-h-[415px] overflow-y-scroll">
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          {" "}
          {photos.length > 0 &&
            photos.map(({ id, urls: { regular }, alt_description }) => (
              <div
                key={id}
                className="relative flex flex-col w-full rounded-lg overflow-hidden"
              >
                <Image
                  src={regular}
                  alt={alt_description}
                  width={800} // Replace with your desired pixel width
                  height={600} // Replace with your desired pixel height
                  priority
                  unoptimized
                  // style={{
                  //   aspectRatio: "4 / 3", // Maintains the 4:3 aspect ratio
                  // }}
                  className="rounded-lg z-10 object-contain"
                />
                <div className="absolute w-full h-full rounded-lg bg-muted" />
              </div>
            ))}
        </div> */}
        <Gallery
          images={photos}
          onClick={(_, item) => {
            onSelectImage({ acceptedFiles: item.src, from: "stockPhotos" });
          }}
          enableImageSelection={false}
        />

        {loading && (
          <div className="flex justify-center">
            <Icons.Loader className="w-7 h-7 stroke-primary animate-spin" />
          </div>
        )}
        <div ref={ref} className="w-full h-5" />
      </div>
    </div>
  );
}
