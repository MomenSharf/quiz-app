// import { Input } from "@/components/ui/input";
// import { giphyGIFs, stockPhotos } from "@/lib/actions/image.actions";
// import { GiphyApiResponse, Photo, UnsplashPhoto } from "@/types";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useDebounce, useDebouncedCallback } from "use-debounce";
// import { useEditorContext } from "../EditorContext";
// import { Url } from "url";
// import { Button } from "@/components/ui/button";
// import { Filter } from "bad-words";
// import Image from "next/image";

// export default function GiphyGIFs() {
//   const [query, setQuery] = useState("");
//   const [GIFs, setGIFs] = useState<GiphyApiResponse[]>([]);
//   const [noMore, setNoMore] = useState(false);
//   const page = useRef(2);
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     dispatch,
//     state: { currentQuestion },
//   } = useEditorContext();

//   const filter = new Filter();

//   const handleSearch = async () => {
//     if (
//       query === "" ||
//       filter.isProfane(query)
//       // (process.env.MY_PASSWORD && !query.startsWith(process.env.MY_PASSWORD))
//     ) {
//       return;
//     }
//     try {
//       // const newQuery = query.split("-").slice(1).join("-");
//       // console.log(newQuery);

//       setIsLoading(true);
//       const GIFs = await giphyGIFs(query, "1");
//       // console.log(GIFs);

//       if (GIFs.length !== 0) {
//         setGIFs(GIFs);
//         setIsLoading(false);
//         setNoMore(false);
//       } else {
//         setNoMore(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLoadMore = async () => {

//     if (query === "") return;
//     try {
//       setIsLoading(true);
//       const GIFs = await giphyGIFs(query, page.current.toString());
//       if (GIFs.length !== 0) {
//         page.current = page.current + 1;
//         setGIFs((prev) => [...prev, ...GIFs]);
//         setNoMore(false);
//         setIsLoading(false);
//       } else {
//         setNoMore(true);
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error);
//     }
//   };
//   const debouncedHandleSearch = useDebouncedCallback(handleSearch, 1000);

//   useEffect(() => {
//     debouncedHandleSearch();
//   }, [debouncedHandleSearch, query]);

//   const handleOnClick = (url: string) => {
//     dispatch({
//       type: "SET_IS_QUESTION_IMAGE_MANAGER_TABS_OPEN",
//       payload: false,
//     });
//     dispatch({
//       type: "SET_IS_IMAGE_EDITOR_OPEN",
//       payload: { isOpen: true, url },
//     });
//   };

//   return (
//     <div className="flex flex-col gap-3 w-full h-full pt-2">
//       <Input
//         placeholder="Search GIFs form Giphy"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       <div className="overflow-y-auto max-h-full flex flex-col">
//         <div className="grid grid-cols-3">
//           {GIFs.map(({ url, id, title, images: {original} }) => {
//             return (
//               <div key={id}>
//                 <Image
//                   src={original.url}
//                   alt={title}
//                   width={100 / 3}
//                   height={100}
//                 />
//                 ;
//               </div>
//             );
//           })}
//         </div>
//         {(query || GIFs.length !== 0) && (
//           <div className="flex justify-center mt-3">
//             {noMore ? (
//               <span className="font-semibold">No Images</span>
//             ) : (
//               <Button onClick={handleLoadMore} disabled={isLoading}>
//                 {isLoading ? "lading..." : "load more"}
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
