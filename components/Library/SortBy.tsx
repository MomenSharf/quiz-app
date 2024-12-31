import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIBRARY_SORT_OPTIONS_WITH_LABEL } from "@/constants";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SortBy() {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const sortBy = searchParams.get('sortBy') || '';

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('sortBy', term);
    } else {
      params.delete('sortBy');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  
  
  return (
    <Select defaultValue={sortBy} onValueChange={handleSearch}>
      <SelectTrigger className="w-[120px] sm:w-[160px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {LIBRARY_SORT_OPTIONS_WITH_LABEL.map(({value, label}) => {
          return (
            <SelectItem value={value} key={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
