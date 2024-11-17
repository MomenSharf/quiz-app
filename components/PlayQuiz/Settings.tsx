import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings as S } from "lucide-react";

export default function Settings() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <S className="w-5 h-5 text" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 min-h-20 flex items-center">
        <DropdownMenuItem>
          <span className="text-sm">Sound effects</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
