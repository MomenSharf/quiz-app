import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "../icons";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function EditorMenu() {

  const router = useRouter()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.menu className="w-5 h-5 stroke-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Button variant='ghost' onClick={() => router.replace('/')} className="text-muted-foreground w-full mt-3 justify-start gap-2">
          <Icons.home className="w-4 h-4 fill-muted-foreground" />
          Home
        </Button>
      </SheetContent>
    </Sheet>
  );
}
