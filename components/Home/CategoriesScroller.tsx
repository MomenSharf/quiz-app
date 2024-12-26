import { CATEGORY_OPTIONS_LIST } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UseScrollerContainer from "../Shared/UseScrollerContainer";
import { buttonVariants } from "../ui/button";

export default function CategoriesScroller() {
  return (
    <div className="flex flex-col gap-3">
      <h2>CATEGORIES</h2>
      <UseScrollerContainer>
        {CATEGORY_OPTIONS_LIST.map(({ id, label, value, icon: Icon }) => (
          <Link
            key={id}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl min-w-16 min-h-16  sm:min-w-20 sm:min-h-20 flex flex-col gap-1 hover:border-primary hover:scale-[1.05] transition-all duration-200"
            )}
            href={`/discover`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </UseScrollerContainer>
    </div>
  );
}
