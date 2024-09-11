'use client'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FolderPathSegment } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

type BreadcrumbProps = {
  path: FolderPathSegment[];
  currentFolderId: string;
};

export default function BreadcrumbDemoFolderPath({ path, currentFolderId }: BreadcrumbProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    if (id !== currentFolderId) {
      router.push(`/my-quizzes/folders/${id}`);
    }
  };
  
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs font-medium ">
      <Link href='/dashboard' className="hover:text-primary">MY QUIZESS
      </Link>
      <BreadcrumbSeparator />
        {path.map(({ id, title }, index) => (
          <>
            <BreadcrumbItem key={id}>
              <BreadcrumbLink onClick={() => handleClick(id)} className={cn( {
                'cursor-pointer hover:text-primary': (id !== currentFolderId)
              })}>{title.toUpperCase()}</BreadcrumbLink>
            </BreadcrumbItem>
            {(id !== currentFolderId) && <BreadcrumbSeparator />}
          </>
        ))}
        {/* <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
