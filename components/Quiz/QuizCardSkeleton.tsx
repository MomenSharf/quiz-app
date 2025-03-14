import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";

export default function QuizzesCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }} // Ensures it animates only once
      className="min-w-44 w-44 sm:min-w-52 sm:w-52 bg-card rounded-xl flex flex-col"
    >
      <div className="p-2">
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </div>
      <div className="p-2 pb-4 flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col gap-1 w-[80%]">
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-2 w-[50%] rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <div>
            <Skeleton className="h-3 w-14 rounded-xl" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-3 w-14 rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-3 w-14 rounded-xl" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-3 w-14 rounded-xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
